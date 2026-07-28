import js from "@eslint/js";
import globals from "globals";
import jsxA11y from "@htmlacademy/eslint-plugin-jsx-a11y";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

const jsxA11yRecommendedWarnings = Object.fromEntries(
  Object.keys(jsxA11y.flatConfigs.recommended.rules).map((ruleName) => [ruleName, "warn"]),
);

export default tseslint.config(
  { ignores: ["dist", "output", ".lighthouseci", "stats.html"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "jsx-a11y": jsxA11y,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    settings: {
      "jsx-a11y": {
        polymorphicPropName: "asChild",
      },
    },
    rules: {
      ...jsxA11yRecommendedWarnings,
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    files: ["src/components/ui/**/*.{ts,tsx}", "src/contexts/**/*.{ts,tsx}"],
    rules: {
      "react-refresh/only-export-components": "off",
    },
  },
  {
    files: ["scripts/**/*.ts", "playwright.config.ts", "e2e/**/*.ts"],
    languageOptions: {
      ecmaVersion: 2024,
      globals: globals.node,
    },
  },
);
