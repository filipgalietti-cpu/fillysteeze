// ESLint configuration for browser JavaScript
export default [
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "script",
      globals: {
        // Browser globals
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        console: "readonly",
        alert: "readonly",
        confirm: "readonly",
        prompt: "readonly",
        localStorage: "readonly",
        sessionStorage: "readonly",
        fetch: "readonly",
        setTimeout: "readonly",
        setInterval: "readonly",
        clearTimeout: "readonly",
        clearInterval: "readonly",
        FormData: "readonly",
        URLSearchParams: "readonly",
        URL: "readonly",
        Event: "readonly",
        CustomEvent: "readonly",
        XMLHttpRequest: "readonly",
        Element: "readonly",
        HTMLElement: "readonly",
        NodeList: "readonly",
        FileReader: "readonly",
        Blob: "readonly",
        File: "readonly",
      },
    },
    rules: {
      // Possible errors
      "no-console": "off", // Allow console for debugging
      "no-debugger": "warn",
      "no-alert": "warn",
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      
      // Best practices
      "eqeqeq": ["error", "always"],
      "no-var": "error",
      "prefer-const": "warn",
      "no-undef": "error",
      
      // Stylistic
      "semi": ["error", "always"],
      "quotes": ["warn", "double", { avoidEscape: true }],
      "indent": ["warn", 2],
      "comma-dangle": ["warn", "only-multiline"],
    },
  },
  {
    ignores: [
      "node_modules/",
      "dist/",
      "build/",
      "*.min.js",
    ],
  },
];
