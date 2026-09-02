import baseConfig, {recommendedIgnorePatterns} from '@shelf/prettier-config/oxfmt';

export default {
  ...baseConfig,
  // The style guide's "Wrong" code blocks intentionally show bad formatting.
  ignorePatterns: [...recommendedIgnorePatterns, 'docs/style-guide.md'],
};
