/**
 * Reject tests whose only assertions prove data-testid hooks exist.
 *
 * A test that renders a component and asserts `getByTestId(...)` presence
 * restates the JSX: it cannot fail while the surface is broken, and
 * `getByTestId` already throws when the hook is missing. Assert behavior the
 * user can observe (roles, accessible names, text, values, callbacks)
 * instead; testids stay welcome as selectors for those real assertions.
 */

const functionTypes = new Set([
  'ArrowFunctionExpression',
  'FunctionDeclaration',
  'FunctionExpression',
]);

const testNames = new Set(['it', 'test']);
const chainModifiers = new Set(['not', 'resolves', 'rejects']);
const presenceMatchers = new Set(['toBeInTheDocument', 'toBeVisible', 'toBeTruthy', 'toBeDefined']);
const testidQuery = /^(?:get|getAll|query|queryAll|find|findAll)ByTestId$/;

const isNode = node => Boolean(node && typeof node.type === 'string');
const toArray = value => (Array.isArray(value) ? value : [value]);
const getChildren = (node, visitorKeys) =>
  (visitorKeys[node.type] ?? []).flatMap(key => toArray(node[key])).filter(isNode);

const walk = (node, visitorKeys, visit) => {
  if (!isNode(node)) {
    return;
  }

  visit(node);
  getChildren(node, visitorKeys).forEach(child => walk(child, visitorKeys, visit));
};

const unwrapAwait = node => (node?.type === 'AwaitExpression' ? node.argument : node);

const isTestidQueryCall = node => {
  const call = unwrapAwait(node);

  if (call?.type !== 'CallExpression') {
    return false;
  }

  const {callee} = call;

  if (callee.type === 'Identifier') {
    return testidQuery.test(callee.name);
  }

  return (
    callee.type === 'MemberExpression' &&
    !callee.computed &&
    callee.property.type === 'Identifier' &&
    testidQuery.test(callee.property.name)
  );
};

// Resolves `it`, `test`, `it.only`, and the `it.each(table)(title, fn)`
// invocation down to the base test identifier.
const testCallName = callee => {
  if (callee.type === 'Identifier') {
    return callee.name;
  }

  if (callee.type === 'MemberExpression' && !callee.computed) {
    return testCallName(callee.object);
  }

  if (callee.type === 'CallExpression') {
    return testCallName(callee.callee);
  }

  return null;
};

// Unwraps `expect(arg).not.resolves...matcher()` chains; returns the expect
// argument, the matcher name, and whether the chain negates.
const matcherAssertion = node => {
  if (
    node.type !== 'CallExpression' ||
    node.callee.type !== 'MemberExpression' ||
    node.callee.computed ||
    node.callee.property.type !== 'Identifier'
  ) {
    return null;
  }

  const matcherName = node.callee.property.name;
  let negated = false;
  let base = node.callee.object;

  while (
    base.type === 'MemberExpression' &&
    !base.computed &&
    base.property.type === 'Identifier' &&
    chainModifiers.has(base.property.name)
  ) {
    negated = negated || base.property.name === 'not';
    base = base.object;
  }

  if (
    base.type !== 'CallExpression' ||
    base.callee.type !== 'Identifier' ||
    base.callee.name !== 'expect' ||
    base.arguments.length === 0
  ) {
    return null;
  }

  return {argument: unwrapAwait(base.arguments[0]), matcherName, negated};
};

// Maps every resolved identifier reference to its variable so `expect(x)`
// honors the scope that actually declared `x`, not any same-named variable
// elsewhere in the test.
const buildReferenceMap = scopeManager => {
  const map = new Map();

  const collect = scope => {
    scope.references.forEach(reference => {
      if (reference.resolved) {
        map.set(reference.identifier, reference.resolved);
      }
    });
    scope.childScopes.forEach(collect);
  };

  collect(scopeManager.globalScope);

  return map;
};

const isTestidVariable = variable => {
  if (!variable) {
    return false;
  }

  const writes = variable.references.map(reference => reference.writeExpr).filter(Boolean);

  return writes.length > 0 && writes.every(isTestidQueryCall);
};

export const noTestidOnlyTestsRule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Reject tests whose only assertions prove data-testid hooks exist',
    },
    schema: [],
    messages: {
      testidOnly:
        'Every assertion in this test just proves a data-testid exists; getByTestId already throws when the hook is missing. Assert observable behavior (role, accessible name, text, value, callback) or delete the test.',
    },
  },

  create(context) {
    const {scopeManager, visitorKeys} = context.sourceCode;
    let referenceMap = null;

    const resolveVariable = identifier => {
      referenceMap ??= buildReferenceMap(scopeManager);

      return referenceMap.get(identifier);
    };

    return {
      CallExpression(node) {
        const name = testCallName(node.callee);

        if (name === null || !testNames.has(name)) {
          return;
        }

        const callback = node.arguments.findLast(argument => functionTypes.has(argument.type));

        if (!callback) {
          return;
        }

        let total = 0;
        let presence = 0;

        walk(callback.body, visitorKeys, child => {
          const assertion = matcherAssertion(child);

          if (!assertion) {
            return;
          }

          total += 1;
          const targetsTestid =
            isTestidQueryCall(assertion.argument) ||
            (assertion.argument.type === 'Identifier' &&
              isTestidVariable(resolveVariable(assertion.argument)));

          if (targetsTestid && !assertion.negated && presenceMatchers.has(assertion.matcherName)) {
            presence += 1;
          }
        });

        if (total > 0 && total === presence) {
          context.report({node: node.callee, messageId: 'testidOnly'});
        }
      },
    };
  },
};

export const testidOnlyTestsPlugin = {
  rules: {
    'no-testid-only-tests': noTestidOnlyTestsRule,
  },
};

export default {
  'shelf/no-testid-only-tests': 'error',
};
