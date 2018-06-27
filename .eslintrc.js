module.exports = {
  env: {
    node: true,
    es6: true
  },
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended",
  ],
  parser: "typescript-eslint-parser",
  rules: {
    "prettier/prettier": [
      "error",
      {
        singleQuote: true,
        trailingComma: "es5"
      }
    ],
    "no-unused-vars": "off",
    "no-undef": "off",
  },
  "parserOptions": {
    "sourceType": "module"
  }
};
