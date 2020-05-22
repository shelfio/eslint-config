module.exports = [
  'error',
  {
    blankLine: 'always',
    prev: '*',
    next: 'return',
  },
  {
    blankLine: 'always',
    prev: '*',
    next: 'export',
  },
  {
    blankLine: 'always',
    prev: ['if', 'const', 'let', 'var'],
    next: 'if',
  },
  {
    blankLine: 'always',
    prev: ['if'],
    next: ['const', 'let', 'var'],
  },
  {
    blankLine: 'always',
    prev: ['import'],
    next: '*',
  },
  {
    blankLine: 'never',
    prev: 'import',
    next: 'import',
  },
];
