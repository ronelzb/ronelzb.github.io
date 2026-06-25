import js from "@eslint/js";
import globals from "globals";
import prettierConfig from "eslint-config-prettier";

export default [
  {
    ignores: [
      "_site/**",
      ".jekyll-cache/**",
      "assets/js/animatescroll.min.js",
      "assets/js/jquery.nav.js",
      "venv/**",
      "node_modules/**",
    ],
  },
  js.configs.recommended,
  prettierConfig,
  {
    files: ["assets/js/main.js"],
    languageOptions: {
      ecmaVersion: 2025,
      sourceType: "script",
      globals: {
        ...globals.browser,
        ...globals.jquery,
      },
    },
  },
  {
    files: ["sw.js"],
    languageOptions: {
      ecmaVersion: 2025,
      sourceType: "script",
      globals: {
        ...globals.browser,
        ...globals.serviceworker,
      },
    },
  },
  {
    files: ["scripts/**/*.mjs"],
    languageOptions: {
      ecmaVersion: 2025,
      sourceType: "module",
      globals: {
        ...globals.node,
      },
    },
  },
];
