module.exports = {
  'env': {
    'es6': true,
    'node': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:node/recommended',
    'plugin:promise/recommended',
  ],
  'parserOptions': {
    'ecmaVersion': 2017,
    'sourceType': 'module',
    'ecmaFeatures': {
      'experimentalObjectRestSpread': true,
    },
  },
  'plugins': [
    'import',
    'node',
    'prettier',
    'promise',
  ],
  'rules': {
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ],
    'import/order': [2, {
      'groups': [['builtin', 'external'], ['internal', 'parent', 'sibling', 'index']],
      'newlines-between': 'always',
    }],
    'import/newline-after-import': [2],
    'prettier/prettier': [
      'error',
      {
        'printWidth': 80,
        'singleQuote': true,
        'trailingComma': 'all',
        'bracketSpacing': true,
        'jsxBracketSameLine': false,
        'parser': 'babylon',
        'semi': true,
        'arrowParens': 'always',
      },
    ],
  }
};
