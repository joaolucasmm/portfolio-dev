import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

export default [
    { ignores: ["build/", "coverage/", "playwright-report/", "test-results/"] },
    js.configs.recommended,
    {
        files: ["src/**/*.{js,jsx}"],
        ...react.configs.flat.recommended,
        ...react.configs.flat["jsx-runtime"],
        languageOptions: {
            ...react.configs.flat.recommended.languageOptions,
            ecmaVersion: "latest",
            sourceType: "module",
            globals: globals.browser,
        },
        settings: { react: { version: "detect" } },
        plugins: { react, "react-hooks": reactHooks },
        rules: {
            ...react.configs.flat.recommended.rules,
            ...react.configs.flat["jsx-runtime"].rules,
            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn",
            // Props are documented by their use; the project has no PropTypes.
            "react/prop-types": "off",
        },
    },
    {
        files: ["src/**/*.test.{js,jsx}", "src/setupTests.js"],
        languageOptions: { globals: { ...globals.browser, ...globals.vitest } },
    },
    {
        files: ["*.config.js", "scripts/**/*.js", "e2e/**/*.js"],
        languageOptions: { globals: globals.node, sourceType: "commonjs" },
    },
    {
        // Callbacks passed to page.evaluate run in the browser.
        files: ["e2e/**/*.js"],
        languageOptions: { globals: { ...globals.node, ...globals.browser } },
    },
    {
        files: ["*.config.mjs"],
        languageOptions: { globals: globals.node },
    },
];
