module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['eslint:recommended', 'prettier', 'standard'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    prettier: 0, // 以prettier规则优先
    semi: [2, 'always'],
    'no-unused-vars': 0,
    // 'comma-dangle': ['error', 'never'],
    'space-before-function-paren': 0,
    quotes: [2, 'single', 'avoid-escape'],
    'spaced-comment': ['error', 'always']
  }
};
