import importPlugin from 'eslint-plugin-import';

export default {
  ...importPlugin.flatConfigs.recommended,
  name: 'import-order',
  rules: {
    'import/no-deprecated': 'error',
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
    'sort-imports': [
      'error',
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
      },
    ],
  },
};
