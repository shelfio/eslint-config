import typescriptConfig from './typescript-no-prettier.js';

export default [
  {ignores: ['tests/**', 'work/**', '.eslint-config-inspector/**']},
  ...typescriptConfig,
  {rules: {'jest/no-deprecated-functions': 'off'}},
];
