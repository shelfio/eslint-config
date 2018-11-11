module.exports = {
  extends: ['@shelf/eslint-config', 'plugin:react/recommended', 'prettier/react'],
  plugins: ['react'],
  env: {
    browser: true
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  }
};
