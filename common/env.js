import globals from 'globals';
import jest from 'eslint-plugin-jest';

export default {
  ...globals.jest,
  ...jest.environments.globals.globals,
  ...globals.node,
};
