// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  // eslint-disable-next-line prettier/prettier
<<<<<<< HEAD
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
  ],
=======
  extends: ["eslint:recommended", "plugin:react/recommended", "plugin:prettier/recommended"],
>>>>>>> origin/jungYH
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "prettier"],
  rules: {
    "prettier/prettier": 0,
    "react/prop-types": "off",
<<<<<<< HEAD
    "no-unused-vars": [
      "error",
      { vars: "all", args: "after-used", ignoreRestSiblings: false },
    ],
=======
    "no-unused-vars": "off",
>>>>>>> origin/jungYH
  },
};
