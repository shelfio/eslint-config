## 9.1.0

- `no-restricted-imports` no longer blocks `natural-orderby`. `@shelf/fast-natural-order-by` 2.0.0 only re-exports it, so import `natural-orderby` directly. The `javascript-natural-sort` message now recommends `natural-orderby`.

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
