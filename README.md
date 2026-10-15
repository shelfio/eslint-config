# @shelf/eslint-config

## Style Guide

Read our [style guide](./docs/style-guide.md)

## Install

```bash
$ pnpm add --save-dev --save-exact @shelf/eslint-config
```

## Usage

The ESLint configs leave formatting to Oxfmt. Use them together with the Oxfmt config below.

### Backend

```js
import tsConfig from '@shelf/eslint-config/typescript-no-prettier.js';

export default [...tsConfig];
```

### Frontend

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

## Oxfmt

Install `oxfmt`, and add an `oxfmt.config.ts` that extends the shared config:

```ts
import baseConfig, {recommendedIgnorePatterns} from '@shelf/eslint-config/oxfmt.js';

export default {
  ...baseConfig,
  ignorePatterns: [...recommendedIgnorePatterns],
};
```

`oxfmt.d.ts` types the import, so `oxfmt.config.ts` can stay in the TypeScript project.

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
  ContentApi.save()
);
```

Local UI state and asynchronous work that does not call a remote API remain valid.

## Publish

Set the new version in `package.json` and add it to `CHANGELOG.md`. When the change merges to `master`, CI publishes the version to npm.

## License

MIT © [Shelf](https://shelf.io)
