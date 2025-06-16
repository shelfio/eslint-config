import typescriptConfig from './typescript.js';

const config = typescriptConfig.map((conf) => {
  return {
    ...conf,
    rules: {
      ...conf.rules,
      'jest/no-deprecated-functions': 'off',
    },
  };
});

export default config;
