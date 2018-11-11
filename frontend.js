module.exports = {
  extends: ['@shelf/eslint-config', 'plugin:react/recommended', 'prettier/react'],
  plugins: ['react'],
  env: {
    browser: true
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  }
};
