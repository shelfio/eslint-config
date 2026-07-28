import assert from 'node:assert/strict';
import test from 'node:test';
import tsParser from '@typescript-eslint/parser';
import {RuleTester} from 'eslint';
import frontendConfig from '../frontend-typescript.js';
import noPrettierConfig from '../frontend-typescript-no-prettier.js';
import {noTestidOnlyTestsRule} from './no-testid-only-tests.js';

const enablesRule = (config) =>
  config.some(
    (entry) =>
      entry.files &&
      entry.rules?.['shelf/no-testid-only-tests'] === 'error' &&
      config.some((other) => other.plugins?.shelf?.rules?.['no-testid-only-tests']),
  );

test('frontend configs enforce the rule for test files', () => {
  assert.equal(enablesRule(frontendConfig), true);
  assert.equal(enablesRule(noPrettierConfig), true);
});

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 'latest',
    parser: tsParser,
    parserOptions: {ecmaFeatures: {jsx: true}},
    sourceType: 'module',
  },
});

const testidOnly = [{messageId: 'testidOnly'}];

ruleTester.run('no-testid-only-tests', noTestidOnlyTestsRule, {
  valid: [
    // Testid used as a selector for a behavioral assertion.
    `
      it('labels the save action', () => {
        render(<Widget />);
        expect(screen.getByTestId('widget-save')).toHaveAccessibleName('Save');
      });
    `,
    // Mixed: one presence check plus a real assertion.
    `
      it('opens the dropdown', async () => {
        render(<Widget />);
        expect(screen.getByTestId('widget-trigger')).toBeInTheDocument();
        expect(screen.getByTestId('widget-option-a')).toHaveTextContent('Alpha');
      });
    `,
    // Absence assertions are real conditional-rendering checks.
    `
      it('hides the dialog by default', () => {
        render(<Widget />);
        expect(screen.queryByTestId('widget-dialog')).not.toBeInTheDocument();
      });
    `,
    // Presence of a non-testid query is out of scope here.
    `
      it('renders the dialog', () => {
        render(<Widget />);
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
    `,
    // No assertions at all is not this rule's concern.
    `
      it('renders', () => {
        render(<Widget />);
      });
    `,
    // Variables from testid queries feeding behavioral assertions are fine.
    `
      it('enables the trigger', () => {
        render(<Widget />);
        const trigger = screen.getByTestId('widget-trigger');
        expect(trigger).toHaveAccessibleName('Open');
      });
    `,
    // Non-test functions are ignored.
    `
      const helper = () => {
        expect(screen.getByTestId('widget')).toBeInTheDocument();
      };
    `,
  ],
  invalid: [
    {
      code: `
        it('exposes stable selectors', () => {
          render(<Widget />);
          expect(screen.getByTestId('widget-trigger')).toBeInTheDocument();
          expect(screen.getByTestId('widget-content')).toBeVisible();
        });
      `,
      errors: testidOnly,
    },
    {
      code: `
        test('renders hooks', () => {
          render(<Widget />);
          expect(getByTestId('widget')).toBeTruthy();
        });
      `,
      errors: testidOnly,
    },
    {
      code: `
        it('scopes rows', () => {
          render(<Widget />);
          expect(within(list).getByTestId('row-1')).toBeInTheDocument();
        });
      `,
      errors: testidOnly,
    },
    // Assigning the query to a variable first is the same banned test.
    {
      code: `
        it('exposes the trigger', () => {
          render(<Widget />);
          const trigger = screen.getByTestId('widget-trigger');
          expect(trigger).toBeInTheDocument();
        });
      `,
      errors: testidOnly,
    },
    // Async variants and awaited queries count too.
    {
      code: `
        it('shows the panel', async () => {
          render(<Widget />);
          expect(await screen.findByTestId('widget-panel')).toBeInTheDocument();
        });
      `,
      errors: testidOnly,
    },
    // The it.each(table)(title, fn) invocation is still a test block.
    {
      code: `
        it.each([['a'], ['b']])('renders %s', (id) => {
          render(<Widget />);
          expect(screen.getByTestId(id)).toBeInTheDocument();
        });
      `,
      errors: testidOnly,
    },
  ],
});
