export default {
  'no-restricted-imports': [
    'error',
    {
      patterns: [
        {
          group: ['date-fns', '@shelf/dates'],
          message: 'Use @shelf/datetime instead',
        },
      ],
      paths: [
        {
          name: 'normalize-space-x',
          message: 'Please use @shelf/fast-normalize-spaces instead!',
        },
        {
          name: 'javascript-natural-sort',
          message: 'Please use @shelf/fast-natural-order-by instead!',
        },
        {
          name: 'natural-orderby',
          message: 'Please use @shelf/fast-natural-order-by instead!',
        },
        {
          name: 'uslug',
          message: 'Please use @shelf/fast-uslug instead!',
        },
        {
          name: 'fast-chunk-string',
          message: 'Please use @shelf/fast-chunk-string instead!',
        },
        {
          name: 'toc',
          message: 'Please use @shelf/table-of-contents instead!',
        },
        {
          name: 'uuid',
          message: "Please use import {randomUUID} from 'crypto' instead!",
        },
        {
          name: 'react-outside-click-handler',
          message:
            'Please use [@shelf/react-outside-click](https://www.npmjs.com/package/@shelf/react-outside-click)',
        },
      ],
    },
  ],
};
