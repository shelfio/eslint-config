import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import babel from "@babel/eslint-plugin";
import react from "eslint-plugin-react";
import prettier from "eslint-plugin-prettier";
import _import from "eslint-plugin-import";
import globals from "globals";
import babelParser from "@babel/eslint-parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import importOrder from './rules/import-order.js';
import paddingLineBetweenStatements from './rules/padding-line-between-statements.js';
import stylisticJs from '@stylistic/eslint-plugin-js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

export default [...fixupConfigRules(compat.extends(
  "plugin:react/recommended",
)),
  eslintPluginPrettierRecommended,
  {
    plugins: {
      babel,
      react: fixupPluginRules(react),
      prettier,
      import: fixupPluginRules(_import),
      '@stylistic/js': stylisticJs,
    },

    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.meteor,
      },

      parser: babelParser,

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },

        allowImportExportEverywhere: false,
        codeFrame: false,
      },
    },

    rules: {
      "prettier/prettier": "error",
      ...importOrder,
      ...paddingLineBetweenStatements,
      "comma-dangle": "off",
      camelcase: "error",
      eqeqeq: ["error", "smart"],
      "new-cap": "error",
      "no-extend-native": "error",
      "no-use-before-define": ["error", "nofunc"],
      "@stylistic/js/multiline-comment-style": ["error", "separate-lines"],
      "no-unreachable": "error",
      "require-await": "error",
    },
  }];
