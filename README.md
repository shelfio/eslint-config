# @shelf/eslint-config ![](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)

## Style Guide

Read our [style guide](./docs/style-guide.md)

## Install

```
$ yarn add @shelf/eslint-config --dev
```

## Usage

### Backend

```js
import tsConfig from '@shelf/eslint-config/typescript';

export default [...tsConfig];
```

### Frontend

#### JavaScript with React `eslint.config.js`

```js
import feConfig from '@shelf/eslint-config/frontend';

export default [
  ...feConfig,
  {
    settings: {
      react: {
        version: '16.7.0',
      },
    },
    rules: {
      "react/prop-types": "warn"
    }
  }
];
```

#### TypeScript or TypeScript + Next `eslint.config.js`

```js
import feTsConfig from '@shelf/eslint-config/frontend-typescript';

export default [
  ...feTsConfig,
  {
    settings: {
      react: {
        version: '16.7.0',
      },
    },
    rules: {
      "react/prop-types": "warn"
    }
  }
];
```

## Publish

```sh
$ yarn version
$ git push --tags
```

## License

MIT © [Shelf](https://shelf.io)
