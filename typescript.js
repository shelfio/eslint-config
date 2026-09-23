import prettierConfig from 'eslint-plugin-prettier/recommended';
import {createTypescriptConfig} from './common/typescript.js';

export default createTypescriptConfig({prettierConfig});
