const baseConfig = require('../../../jest.config');

module.exports = {
  ...baseConfig,
  globals: {
    ...baseConfig.globals,
    'ts-jest': {
      ...baseConfig.globals['ts-jest'],
      tsConfigFile: '<rootDir>/projects/shared/tsconfig.spec.json',
    }
  },
  rootDir: '../../..',
  roots: ['<rootDir>/projects/shared/src'],
  coverageDirectory: 'coverage/shared'
};
