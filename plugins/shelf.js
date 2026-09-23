import {sourceFiles, testFiles} from '../common/files.js';
import preferSWRMutation, {swrMutationPlugin} from '../rules/prefer-swr-mutation.js';
import noTestidOnlyTests, {testidOnlyTestsPlugin} from '../rules/no-testid-only-tests.js';

export default [
  {
    name: 'shelf/application-rules',
    files: sourceFiles,
    plugins: {shelf: {rules: {...swrMutationPlugin.rules, ...testidOnlyTestsPlugin.rules}}},
    rules: preferSWRMutation,
  },
  {name: 'shelf/test-assertions', files: testFiles, rules: noTestidOnlyTests},
];
