const baseConfig = require('../../../jest.config');

module.exports = {
  ...baseConfig,
  globals: {
    ...baseConfig.globals,
    'ts-jest': {
      ...baseConfig.globals['ts-jest'],
      tsConfigFile: '<rootDir>/projects/connection/tsconfig.spec.json',
    }
  },
  rootDir: '../../..',
  roots: ['<rootDir>/projects/connection/src'],
  coverageDirectory: 'coverage/connection'
};
