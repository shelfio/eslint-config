# Frontend module review

The `feature/simplfy-setup` branch established the right structure: a short
composition entrypoint, one module per plugin, and overrides next to their rule
owner. This update retains that structure and the `typescript-v2.js` import path.
`frontend.js` uses ESLint 10's native `defineConfig`; the TypeScript helper is
deprecated in the installed typescript-eslint version.

## Changes carried forward

| Area                     | Decision                                                                                                                                                                                       |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Parsing                  | One TypeScript syntax parse; no `project` or `projectService`. Run the TypeScript checker separately.                                                                                          |
| React Compiler           | Separate opt-in `react-compiler.js`; Rules of Hooks and exhaustive dependencies stay on.                                                                                                       |
| Prettier                 | No formatter plugin in the new frontend dependency graph. Keep the disabling-only compatibility config; run Oxfmt separately.                                                                  |
| Assignment analysis      | Remove Sonar `no-dead-store` and `no-redundant-assignments` as requested. Also disable core `no-useless-assignment`, newly recommended in ESLint 10, so the same category is not reintroduced. |
| Unused imports/variables | TypeScript `no-unused-vars` owns both, including type files and JS configs. Core and Sonar alternatives off.                                                                                   |
| Variable scope           | Core `no-var` owns the declaration policy; Sonar `block-scoped-var` off.                                                                                                                       |
| Type-only Sonar checks   | Disable the 28 previously source-verified rules with no syntax fallback. Do not filter every rule by metadata: some retain syntax checks.                                                      |
| Infrastructure           | AWS/CDK rules excluded from frontend.                                                                                                                                                          |
| Tests                    | Jest, Testing Library test analysis, Shelf test checks and Sonar test checks scoped to test/mock files. Test ID naming still applies to production JSX.                                        |
| Legacy                   | The six published legacy entrypoints share factories and retain 7.2 rule settings. Adoption of the new frontend remains explicit.                                                              |

## Original v2 corrections

- `plugins/typescript.ts` became `.js`, matching the imported filename and the
  package's executable JavaScript exports.
- The imports module previously spread `recommended` and then replaced its entire
  `rules` object. It now explicitly lists local import policies. Export-map checks,
  including `import/no-deprecated`, are excluded to avoid parsing imported files.
  This is a deliberate coverage tradeoff, not proof that another check is identical.
- Native `jest/padding-around-all` replaces the separate Jest-formatting plugin in
  the new preset. It is a valid rule in both the branch's Jest 29.0.1 and current
  Jest 29.16.0. Legacy exports retain their original formatting plugin.
- Sonar's `prefer-native-lodash-alternative` is off. The Lodash module is the policy
  owner, including deliberate exceptions such as `uniq`; Sonar contradicted them.
- The TypeScript `max-params` extension replaces core `max-params`. More generally,
  the audit checks that a TypeScript extension and its core rule are not both on.
- Preserve the branch's explicit policies: strict equality, type aliases,
  `react/no-danger`, self-closing elements, unused props, Jest mock typing,
  hooks-first tests, and Testing Library query preferences. These can expose new
  application findings compared with the previous prototype.

## Reviewing rules

`pnpm inspect-config` opens the pinned official inspector for `frontend.js`.
Choose a representative file to inspect effective rules and their named origins.
`pnpm audit:rules --json /tmp/frontend-rule-audit.json` writes all effective rule
settings, descriptions, documentation links, disabled rules, declarations and
conflict results across twelve representative paths.

Neither tool can prove semantic equivalence across plugins. For example, similarly
named Sonar and Jest checks can differ on helper functions or non-Jest frameworks.
Repeated settings of one rule ID are overrides, not repeated runtime work.

Use `pnpm lint:profile --cwd /path/to/app --consumer /path/to/app/eslint.config.mjs
--output /tmp/profile.json` for per-rule and parser timing. Pass `--pattern .` to
cover the full app's configured inputs. Use `--no-stats` for wall-time comparison,
fresh processes, identical inputs and repeated runs. Compiler diagnostics share
analysis cost; the first enabled compiler rule absorbs much of its recorded time.

## Sources

- [Linear's syntax-only linting approach](https://linear.app/now/ci-bottleneck-reworked#lint-without-the-type-checker)
- [Official ESLint inspector](https://eslint.org/blog/2024/04/eslint-config-inspector/)
- [Core no-useless-assignment](https://eslint.org/docs/latest/rules/no-useless-assignment)
- [Oxfmt migration guidance](https://oxc.rs/docs/guide/usage/formatter/migrate-from-prettier)

## App trial results

One fresh error-only lint process per app, no cache/fixes, one worker, preserving
app overrides and installed ESLint. Candidate plugins use parser 8.66.0, Sonar
4.2.0, React 7.37.5 and Jest 29.16.0. These samples are not a repeated-median
benchmark or a CI speedup claim. Application files remained unchanged.

| App      | Files | Wall time | Errors | Parser failures |
| -------- | ----: | --------: | -----: | --------------: |
| Admin    | 1,896 |    16.59s |    107 |               0 |
| Gem Read | 2,628 |    26.34s |    215 |               0 |
| Cortex   | 6,973 |    88.40s |    936 |               0 |

The errors are adoption work, not a green migration. Cortex has 401 max-params
findings, 326 strict-equality findings, and 146 unused-prop findings from explicit
v2 policies. Their measured callback costs were only 55ms, 19ms, and 664ms.
Review the policy impact separately from the module refactor. Legacy entrypoints
retain their old rules, so existing consumers do not acquire these policies until
they switch presets.

The separate instrumented runs happened just before removing core
no-useless-assignment; all other rules matched the final config. That removed
check cost 110ms/149ms/705ms in Admin/Read/Cortex. Remaining Cortex callback hot
spots were import/order (5.07s), TS unused-vars (3.45s), and React direct-state
mutation (3.00s). Callback costs are not predicted wall-time savings.
