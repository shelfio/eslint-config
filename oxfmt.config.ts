import baseConfig, {recommendedIgnorePatterns} from './oxfmt.js';

export default {
  ...baseConfig,
  // The style guide's "Wrong" code blocks intentionally show bad formatting.
  ignorePatterns: [...recommendedIgnorePatterns, 'docs/style-guide.md'],
};
