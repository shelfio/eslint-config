module.exports.rules = require('./rules');

module.exports.configs = {
  all: {
    plugins: ['shelf-lodash-rules'],
    rules: {
      'shelf-lodash-rules/no-chain-es': 'error',
    },
  },
};
