module.exports = {
  'import/order': [
    'error',
    {
      groups: [['builtin', 'external', 'internal'], ['parent', 'sibling'], 'index'],
    },
  ],
};
