import typescriptConfig from './typescript.js';

export default [
  {ignores: ['.eslint-config-inspector/**']},
  ...typescriptConfig,
  {rules: {'jest/no-deprecated-functions': 'off'}},
];
