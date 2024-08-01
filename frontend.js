import { FlatCompat } from '@eslint/eslintrc';
import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import react from "eslint-plugin-react";
import _import from "eslint-plugin-import";
import sonarjs from "eslint-plugin-sonarjs";
import globals from "globals";
import babelParser from "@babel/eslint-parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import reactHooks from 'eslint-plugin-react-hooks';
import eslintConfigPrettier from 'eslint-config-prettier';
import env from './common/env.js';
import restrictedPackagesImport from './rules/restricted-packages-import.js';
import baseConfig from './base.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

export default [...fixupConfigRules(compat.extends(
  "plugin:react/recommended",
  "plugin:react-hooks/recommended",
)),
  sonarjs.configs.recommended,
  eslintConfigPrettier,
  ...baseConfig,
  {
  plugins: {
    react: fixupPluginRules(react),
    'react-hooks': fixupPluginRules(reactHooks),
    import: fixupPluginRules(_import),
  },

  languageOptions: {
    globals: {
      ...globals.browser,
      ...env,
    },

    parser: babelParser,
    ecmaVersion: 5,
    sourceType: "commonjs",

    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    }
  },

  rules: {
    ...restrictedPackagesImport,
    "no-console": "error",
    "react-hooks/exhaustive-deps": "error",
    "sonarjs/cognitive-complexity": ["error", 18],
    "@stylistic/js/multiline-comment-style": "off",
    "no-unreachable": "error",
    "react/react-in-jsx-scope": "off",
  },
}, {
  files: ["**/*.test.{ts,tsx}"],

  rules: {
    "sonarjs/no-duplicate-string": "off",
  },
}];
