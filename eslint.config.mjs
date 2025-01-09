import globals from "globals";
import eslintConfigPrettier from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  eslintConfigPrettier,
  {
    languageOptions: {
      globals: globals.browser, // Adds browser globals like window, document, etc.
    },
    rules: {
      // Enforce semicolons at the end of statements
      semi: ["error", "always"], // Enforce semicolons at the end of statements
    },
  },
];
