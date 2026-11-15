import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
    { ignores: ["build/", "build-ssr/", "coverage/", "playwright-report/", "test-results/"] },
    js.configs.recommended,
    {
        files: ["src/**/*.{ts,tsx}", "vite.config.mts"],
        extends: [tseslint.configs.recommended],
    },
    {
        files: ["src/**/*.{ts,tsx}"],
        ...react.configs.flat.recommended,
        languageOptions: {
            ...react.configs.flat.recommended.languageOptions,
            globals: globals.browser,
        },
        settings: { react: { version: "detect" } },
        plugins: { react, "react-hooks": reactHooks },
        rules: {
            ...react.configs.flat.recommended.rules,
            ...react.configs.flat["jsx-runtime"].rules,
            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn",
            // TypeScript checks the props.
            "react/prop-types": "off",
        },
    },
    {
        files: ["src/**/*.test.{ts,tsx}", "src/setupTests.ts"],
        languageOptions: { globals: { ...globals.browser, ...globals.vitest } },
    },
    {
        files: ["*.config.js", "scripts/**/*.js", "e2e/**/*.js"],
        languageOptions: { globals: globals.node, sourceType: "commonjs" },
        rules: { "@typescript-eslint/no-require-imports": "off" },
    },
    {
        // Callbacks passed to page.evaluate run in the browser.
        files: ["e2e/**/*.js"],
        languageOptions: { globals: { ...globals.node, ...globals.browser } },
    },
    {
        files: ["*.config.{mjs,mts}", "scripts/**/*.mjs"],
        languageOptions: { globals: globals.node },
    }
);
