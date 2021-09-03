module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
    jest: true,
  },
  parserOptions: { ecmaVersion: 8 },
  ignorePatterns: [
    "node_modules/*",
    ".next/*",
    ".husky/*",
    ".storybook/*",
    "infrastructure",
    "public",
    "!.prettierrc.js",
  ],
  extends: ["eslint:recommended"],
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      parser: "@typescript-eslint/parser",
      settings: { react: { version: "detect" } },
      env: {
        browser: true,
        node: true,
        es6: true,
      },
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:jsx-a11y/recommended",
      ],
      rules: {
        "react/no-unescaped-entities": 0,
        "react/prop-types": "off", // ts types used instead
        "react/react-in-jsx-scope": "off", // no need to import React when using next
        "jsx-a11y/anchor-is-valid": "off", // not compatible with next Link
        "jsx-a11y/no-onchange": "off", // this is only relevant below ie11
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/no-unused-vars": ["warn"],
        "@typescript-eslint/explicit-function-return-type": [
          "warn",
          {
            allowExpressions: true,
            allowConciseArrowFunctionExpressionsStartingWithVoid: true,
          },
        ],
      },
    },
  ],
};
