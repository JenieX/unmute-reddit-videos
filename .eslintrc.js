module.exports = {
  env: {
    browser: !0,
    es2021: !0,
  },
  extends: [
    //
    'airbnb-base',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  globals: {
    GM: 'readonly',
    GM_getValue: 'readonly',
    GM_setValue: 'readonly',
  },
  rules: {
    'no-console': 'off',
    'no-alert': 'off',
    'func-names': 'off',
    camelcase: ['error', { allow: ['GM_getValue', 'GM_setValue'] }],
  },
};
