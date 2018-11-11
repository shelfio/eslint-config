module.exports = {
  extends: ['eslint:recommended', 'prettier'],
  plugins: ['prettier'],
  env: {
    node: true,
    jest: true,
    es6: true
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    'prettier/prettier': 'error',
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: '*',
        next: 'return'
      },
      {
        blankLine: 'always',
        prev: ['if', 'const', 'let', 'var'],
        next: 'if'
      },
      {
        blankLine: 'always',
        prev: ['if'],
        next: ['const', 'let', 'var']
      },
      {
        blankLine: 'always',
        prev: ['import'],
        next: '*'
      },
      {
        blankLine: 'never',
        prev: 'import',
        next: 'import'
      }
    ]
  }
};
