const baseConfig = require('../../../jest.config');

module.exports = {
  ...baseConfig,
  globals: {
    ...baseConfig.globals,
    'ts-jest': {
      ...baseConfig.globals['ts-jest'],
      tsConfigFile: '<rootDir>/projects/core/tsconfig.spec.json',
    }
  },
  rootDir: '../../..',
  roots: ['<rootDir>/projects/core/src'],
  coverageDirectory: 'coverage/core'
};
