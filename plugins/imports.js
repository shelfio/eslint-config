import importPlugin from 'eslint-plugin-import';

export default [
  importPlugin.flatConfigs.recommended,
  {...importPlugin.flatConfigs.typescript, name: 'import-typescript'},
  {
    name: 'shelf-import-order',
    rules: {
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
    },
  },
];
