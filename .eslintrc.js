module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true,
    jasmine: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:node/recommended',
    'plugin:promise/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
  },
  plugins: ['import', 'node', 'prettier', 'promise'],
  rules: {
    'import/order': [
      2,
      {
        groups: [
          ['builtin', 'external'],
          ['internal', 'parent', 'sibling', 'index'],
        ],
        'newlines-between': 'always',
      },
    ],
    'import/newline-after-import': [2],
    'linebreak-style': ['error', 'unix'],
    'no-console': 'off',
    'prettier/prettier': [
      'error',
      {
        arrowParens: 'always',
        bracketSpacing: true,
        jsxBracketSameLine: false,
        parser: 'babylon',
        printWidth: 80,
        semi: true,
        singleQuote: true,
        trailingComma: 'all',
      },
    ],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
  },
};
