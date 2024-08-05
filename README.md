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

#### Vue `eslint.config.js`

```js
import feVueConfig from '@shelf/eslint-config/frontend-vue';

export default [
  ...feVueConfig,
  {
    rules: {
      "no-unused-vars": ["error", {"vars": "all", "argsIgnorePattern": "^h$"}]
    }
  }
];
```

#### Typescript with Vue `eslint.config.js`

```js
import feTsVueConfig from '@shelf/eslint-config/frontend-typescript-vue';

export default [
  ...feTsVueConfig,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", {"vars": "all", "argsIgnorePattern": "^h$"}]
    }
  }
];
```

## Publish

```sh
$ git checkout master
$ yarn version
$ yarn publish
$ git push origin master --tags
```

## License

MIT © [Shelf](https://shelf.io)
