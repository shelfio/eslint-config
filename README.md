# @shelf/eslint-config ![](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)

## Style Guide

Read our [style guide](./docs/style-guide.md)

## Install

```bash
$ yarn add @shelf/eslint-config --dev
```

## Usage

### Backend

```js
import tsConfig from '@shelf/eslint-config/typescript';

export default [...tsConfig];
```

### Frontend

```js
import feTsConfig from '@shelf/eslint-config/frontend-typescript';

export default [
  ...feTsConfig,
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
```

## Publish

```sh
$ yarn version
$ git push --tags
```

## License

MIT © [Shelf](https://shelf.io)
