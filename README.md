# @shelf/eslint-config ![](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)

## Install

```
$ yarn add @shelf/eslint-config --dev
```

## Usage

### Backend

#### JavaScript `.eslintrc`

```json
{
  "extends": ["@shelf/eslint-config/backend"]
}
```

#### TypeScript `.eslintrc`

```json
{
  "extends": ["@shelf/eslint-config/typescript"]
}
```

### Frontend

#### JavaScript with React `.eslintrc`

```json
{
  "extends": ["@shelf/eslint-config/frontend"],
  "settings": {
    "react": {
      "version": "16.7.0"
    }
  },
  "rules": {
    "react/prop-types": "warn"
  }
}
```

#### TypeScript `.eslintrc`

```json
{
  "extends": ["@shelf/eslint-config/frontend-typescript"],
  "settings": {
    "react": {
      "version": "16.7.0"
    }
  },
  "rules": {
    "react/prop-types": "warn"
  }
}
```

#### Vue `.eslintrc`

```json
{
  "extends": ["@shelf/eslint-config/frontend-vue"],
  "rules": {
     "no-unused-vars": ["error", {"vars": "all", "argsIgnorePattern": "^h$"}]
  }
}
```

#### Typescript with Vue `.eslintrc`

```json
{
  "extends": ["@shelf/eslint-config/frontend-typescript-vue"],
  "rules": {
     "@typescript-eslint/no-unused-vars": ["error", {"vars": "all", "argsIgnorePattern": "^h$"}]
  }
}
```

## License

MIT © [Shelf](https://shelf.io)
