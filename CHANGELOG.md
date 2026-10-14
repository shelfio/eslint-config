## 8.0.0

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
