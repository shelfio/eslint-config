import vue from "eslint-plugin-vue";
import babel from "eslint-plugin-babel";
import jsx from "eslint-plugin-jsx";
import _import from "eslint-plugin-import";
import { fixupPluginRules } from "@eslint/compat";
import globals from "globals";
import baseConfig from './base.js';
import babelParser from '@babel/eslint-parser';


export default [
  ...baseConfig,
  ...vue.configs['flat/essential'],
  {
    plugins: {
      vue,
      babel,
      jsx,
      import: fixupPluginRules(_import),
    },

    languageOptions: {
      globals: {
        ...globals.browser,
      },

      ecmaVersion: 5,
      sourceType: "script",

      parserOptions: {
        parser: babelParser,

        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  }
];
