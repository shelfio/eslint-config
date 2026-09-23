export default {
  'import/order': [
    'error',
    {
      pathGroups: [
        {
          pattern: '*@shelf/types**',
          group: 'internal',
          position: 'before',
        },
      ],
      groups: ['builtin', 'external', 'internal', 'type', 'parent', 'sibling', 'index'],
    },
  ],
};
