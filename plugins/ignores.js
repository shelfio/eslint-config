// Build and test output of Shelf frontends. ESLint already ignores node_modules and .git.
export default {
  name: 'shelf/ignores/generated',
  ignores: ['**/.next/', '**/out/', '**/build/', '**/dist/', '**/coverage/', '**/next-env.d.ts'],
};
