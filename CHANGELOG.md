## 10.0.0

- **Breaking:** `typescript-no-prettier.js` and `frontend-typescript-no-prettier.js` enforce `max-params` with `max: 3`. A function that declares four or more parameters fails lint. Fold the parameters into one object, with an options object as the second parameter when needed. To fix existing violations later, run `eslint . --suppress-rule max-params` and commit `eslint-suppressions.json`; ESLint then fails only on new violations.
- `recommendedIgnorePatterns` in `oxfmt.js` also lists `eslint-suppressions.json`. ESLint writes that file without a trailing newline, so `oxfmt --check` would fail on it.

## 9.0.0

- Add the shared Oxfmt config as `@shelf/eslint-config/oxfmt.js`, with types in `oxfmt.d.ts`. It replaces `@shelf/prettier-config/oxfmt`: change the import in `oxfmt.config.ts` and remove `@shelf/prettier-config`.
- **Breaking:** remove the Prettier entrypoints `base.js`, `typescript.js`, and `frontend-typescript.js`, and the `eslint-plugin-prettier` dependency. `prettier` is no longer a peer dependency. Use `typescript-no-prettier.js` or `frontend-typescript-no-prettier.js` with Oxfmt.
- **Breaking:** the package `main` is now `typescript-no-prettier.js` instead of `base.js`.

## 8.0.0

- `common/overrides.js` no longer lists `*wallaby.config.js` in `allowRequireInConfigs`. Shelf repositories do not use Wallaby anymore.
- **Breaking:** `typescript-no-prettier.js` now enforces `curly` (`all`) again. `eslint-config-prettier` turned it off, so repos on Oxfmt accepted `if` statements without braces. Run `eslint --fix`, then Oxfmt, to add the braces.

## 7.0.0

- **Breaking:** Frontend configs now enforce `shelf/prefer-swr-mutation` for manually managed remote loading state.

## 3.0.0

Override recommended no explicit type any in tests

## 2.0.0

Removed separate file for testing-library, added testing-library rules to `frontend-typescript.js`.
Extended `frontend.js` in `frontend-typescript.js` and `frontend-typescript-vue.js`.

## 1.0.0

Breaking changes of the eslint-config-prettier 8.0.0
