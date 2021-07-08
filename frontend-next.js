const nextConfig = require('eslint-config-next');
const typescriptConfig = require('./frontend-typescript');

module.exports = {
  extends: [...nextConfig, ...typescriptConfig],
};
