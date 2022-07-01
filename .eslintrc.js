module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base'],
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
