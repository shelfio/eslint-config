import tsEslint from 'typescript-eslint';
import feVueConfig from './frontend-vue.js';
import tsParser from "@typescript-eslint/parser";
import consistentTypeAssertions from './rules/consistent-type-assertions.js';
import consistentTypeImports from './rules/consistent-type-imports.js';
import tsConfig from './typescript.js';
import overrides from './common/overrides.js';

export default [
  ...feVueConfig,
  ...tsEslint.configs.recommended,
  ...tsConfig,
  {
    languageOptions: {
      ecmaVersion: 5,
      sourceType: "script",

      parserOptions: {
        parser: tsParser,

        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    rules: {
      "jest/lowercase-name": "off",
      ...consistentTypeAssertions,
      ...consistentTypeImports,
      "@typescript-eslint/explicit-member-accessibility": 0,
    },
  },
  overrides.allowRequireInConfigs,
  overrides.noExplicitsInTests,
];
