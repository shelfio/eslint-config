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

## Function Parameters

Both TypeScript configs enforce `max-params` with `max: 3`. A function, method, or callback that declares four or more parameters fails lint:

```ts
// Incorrect
async function request(identity, target, method, path, body = '', options = {}) {}

await request(identity, target, 'POST', '/internal/batch-delete', body, options);
```

Take one params object instead, and an options object as the second parameter when the function needs one:

```ts
async function request(
  {identity, target, method, path, body = ''}: RequestParams,
  options: RequestOptions = {}
) {}

await request({identity, target, method: 'POST', path: '/internal/batch-delete', body}, options);
```

The rule checks declarations, not calls. Calling a third-party function with more arguments stays valid.

To adopt the rule in a repository with existing violations, run `eslint . --suppress-rule max-params` and commit `eslint-suppressions.json`. ESLint then fails only on new violations. `recommendedIgnorePatterns` keeps Oxfmt from checking that file.

## Publish

Set the new version in `package.json` and add it to `CHANGELOG.md`. When the change merges to `master`, CI publishes the version to npm.

## License

MIT © [Shelf](https://shelf.io)
