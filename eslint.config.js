import typescriptConfig from './typescript-no-prettier.js';

export default [
  {ignores: ['.eslint-config-inspector/**']},
  ...typescriptConfig,
  {rules: {'jest/no-deprecated-functions': 'off'}},
];
