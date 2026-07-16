# @shelf/eslint-config

## Style Guide

Read our [style guide](./docs/style-guide.md)

## Install

```bash
$ pnpm add --save-dev --save-exact @shelf/eslint-config
```

## Usage

### Backend

```js
import tsConfig from '@shelf/eslint-config/typescript.js';

export default [...tsConfig];
```

### Frontend

```js
import feTsConfig from '@shelf/eslint-config/frontend-typescript.js';

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

## Oxfmt Migrations

Repos that move formatting out of ESLint and into Oxfmt should use the additive no-Prettier entrypoints:

### Backend, no Prettier plugin

```js
import tsConfig from '@shelf/eslint-config/typescript-no-prettier.js';

export default [...tsConfig];
```

### Frontend, no Prettier plugin

```js
import feTsConfig from '@shelf/eslint-config/frontend-typescript-no-prettier.js';

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

The legacy `typescript.js` and `frontend-typescript.js` entrypoints stay supported for repos that still format through Prettier.

## Remote Mutations

Frontend configs enforce `shelf/prefer-swr-mutation`. The rule reports React loading state that is manually toggled around an awaited `fetch`, Axios call, or Shelf API/client call:

```tsx
// Incorrect
const [isSaving, setIsSaving] = useState(false);

const save = async () => {
  setIsSaving(true);
  try {
    await ContentApi.save();
  } finally {
    setIsSaving(false);
  }
};
```

Use the mutation lifecycle as the source of truth instead:

```tsx
const {trigger: save, isMutating: isSaving} = useSWRMutation('save-content', () =>
  ContentApi.save(),
);
```

Local UI state and asynchronous work that does not call a remote API remain valid.

## Publish

```sh
$ pnpx np
```

## License

MIT © [Shelf](https://shelf.io)
