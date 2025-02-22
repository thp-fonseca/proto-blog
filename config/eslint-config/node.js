import js from '@eslint/js';
import eslintConfigPrettier from "eslint-config-prettier"
import globals from 'globals';
import tseslint from "typescript-eslint"

import { config as baseConfig } from "./base.js"

/**
 * A custom ESLint configuration for libraries that use Next.js.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const nodeJsConfig = [
  ...baseConfig,
  js.configs.recommended,
  eslintConfigPrettier,
 ...tseslint.configs.recommended,
 {
  languageOptions: {
    ecmaVersion: 5,
    sourceType: 'module',
    globals: {
      ...globals.node,
      ...globals.jest,
    },
  }
 },
 {
  rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      'prettier/prettier': [
        'error',
        {
          printWidth: 80,
          tabWidth: 2,
          singleQuote: true,
          trailingComma: 'all',
          arrowParens: 'always',
          semi: false,
        },
      ],
    },
  },
]
