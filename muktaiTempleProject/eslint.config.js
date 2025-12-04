// eslint.config.js
import angularEslint from '@angular-eslint/eslint-plugin';
import tsEslint from '@typescript-eslint/eslint-plugin';
import templateParser from '@angular-eslint/template-parser';
import templateRules from '@angular-eslint/eslint-plugin-template';
import parser from '@typescript-eslint/parser';

export default [
  // TypeScript files
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: ["tsconfig.json"],
      },
    },
    plugins: {
      "@angular-eslint": angularEslint,
      "@typescript-eslint": tsEslint,
    },
    rules: {
      // Angular naming rules
      "@angular-eslint/directive-selector": [
        "error",
        { type: "attribute", prefix: "app", style: "camelCase" }
      ],
      "@angular-eslint/component-selector": [
        "error",
        { type: "element", prefix: "app", style: "kebab-case" }
      ],

      // Actual warnings/errors
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "no-console": "warn",
      "eqeqeq": "error",
      "curly": "error"
    }
  },

  // HTML template files
  {
    files: ["**/*.html"],
    languageOptions: {
      parser: templateParser
    },
    plugins: {
      "@angular-eslint/template": templateRules
    },
    rules: {
      "@angular-eslint/template/no-any": "warn",
      "@angular-eslint/template/eqeqeq": "error"
    }
  }
];
