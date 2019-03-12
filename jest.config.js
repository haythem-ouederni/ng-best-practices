// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

// file originally genetated by running 'jest --init'
// You can use 'yarn ts-jest config:init' to create this file with more ts-jest options two

module.exports = {

  // A set of global variables that need to be available in all test environments
  globals: {
    'ts-jest': {
      tsConfigFile: '<rootDir>/src/tsconfig.spec.json',
      diagnostics: {
        pathRegex: /\.(spec|test)\.ts$/,
        warnOnly: true
      },
      // wait for the latest version of jest-preset-angular to use it
      // stringifyContentPathRegex: '\\.html$'
    },
    '__TRANSFORM_HTML__': true,
  },
  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.(ts|js|html)$': '<rootDir>/node_modules/jest-preset-angular/preprocessor.js'
    // wait for the latest version of jest-preset-angular to use it
    // '^.+\\.(ts|js|html)$': 'ts-jest'
  },

  // The glob patterns Jest uses to detect test files
  testMatch: [
    '**/__tests__/**/*.+(ts|js)?(x)',
    '**/+(*.)+(spec|test).+(ts|js)?(x)',
  ],
  // An array of file extensions your modules use
  moduleFileExtensions: [
    'ts',
    'js',
    'html',
    'json',
  ],
  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  transformIgnorePatterns: [
    'node_modules/(?!@ngrx|angular2-ui-switch|ng-dynamic)',
  ],
  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: [
    'node_modules/',
    'general/config/jest/setup/setupJest.ts',
    'index.ts',
  ],
  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage/all',
  // A list of paths to snapshot serializer modules Jest should use for snapshot testing
  snapshotSerializers: [
    '<rootDir>/node_modules/jest-preset-angular/AngularSnapshotSerializer.js',
    '<rootDir>/node_modules/jest-preset-angular/HTMLCommentSerializer.js',
  ],
  // A preset that is used as a base for Jest's configuration
  preset: 'jest-preset-angular',
  // This option sets the URL for the jsdom environment. It is reflected in properties such as location.href
  testURL: 'http://localhost/',
  // A map from regular expressions to module names that allow to stub out resources with a single module
  moduleNameMapper: {
    '^@abpe/assets/(.*)': '<rootDir>/src/assets/$1',
    '^@abpe/connection/(.*)': '<rootDir>/projects/connection/src/$1',
    '^@abpe/connection': '<rootDir>/projects/connection/src/public_api',
    '^@abpe/shared/(.*)': '<rootDir>/projects/shared/src/$1',
    '^@abpe/shared': '<rootDir>/projects/shared/src/public_api',
    '^@abpe/core/(.*)': '<rootDir>/projects/core/src/$1',
    '^@abpe/core': '<rootDir>/projects/core/src/public_api',
    '^@abpe/root/(.*)': '<rootDir>/src/$1',
    '^@abpe/general/(.*)': '<rootDir>/general/$1',
  },

  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  setupFilesAfterEnv: ['<rootDir>/general/config/jest/setup/setupJest.ts'],

  // The test environment that will be used for testing
  // testEnvironment: 'node',

  // Automatically clear mock calls and instances between every test
  // clearMocks: true,

  // All imported modules in your tests should be mocked automatically
  // automock: false,

  // Stop running tests after `n` failures
  // bail: 0,

  // Respect 'browser' field in package.json when resolving modules
  // browser: false,

  // The directory where Jest should store its cached dependency information
  // cacheDirectory: '/private/var/folders/z3/bfhgnp3529j_416ggznvdbrr0000gn/T/jest_dx',

  // Indicates whether the coverage information should be collected while executing the test
  // collectCoverage: false,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  // collectCoverageFrom: null,

  // A list of reporter names that Jest uses when writing coverage reports
  // coverageReporters: [
  //   'json',
  //   'text',
  //   'lcov',
  //   'clover'
  // ],

  // An object that configures minimum threshold enforcement for coverage results
  // coverageThreshold: null,

  // A path to a custom dependency extractor
  // dependencyExtractor: null,

  // Make calling deprecated APIs throw helpful error messages
  // errorOnDeprecated: false,

  // Force coverage collection from ignored files usin a array of glob patterns
  // forceCoverageMatch: [],

  // A path to a module which exports an async function that is triggered once before all test suites
  // globalSetup: null,

  // A path to a module which exports an async function that is triggered once after all test suites
  // globalTeardown: null,

  // An array of directory names to be searched recursively up from the requiring module's location
  // moduleDirectories: [
  //   'node_modules'
  // ],

  // An array of regexp pattern strings, matched against all module paths before considered 'visible' to the module loader
  // modulePathIgnorePatterns: [],

  // Activates notifications for test results
  // notify: false,

  // An enum that specifies notification mode. Requires { notify: true }
  // notifyMode: 'failure-change',

  // Run tests from one or more projects
  // projects: null,

  // Use this configuration option to add custom reporters to Jest
  // reporters: undefined,

  // Automatically reset mock state between every test
  // resetMocks: false,

  // Reset the module registry before running each individual test
  // resetModules: false,

  // A path to a custom resolver
  // resolver: null,

  // Automatically restore mock state between every test
  // restoreMocks: false,

  // The root directory that Jest should scan for tests and modules within
  // rootDir: null,

  // A list of paths to directories that Jest should use to search for files in
  // roots: [
  //   '<rootDir>'
  // ],

  // Allows you to use a custom runner instead of Jest's default test runner
  // runner: 'jest-runner',

  // The paths to modules that run some code to configure or set up the testing environment before each test
  // setupFiles: [],

  // Options that will be passed to the testEnvironment
  // testEnvironmentOptions: {},

  // Adds a location field to test results
  // testLocationInResults: false,

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  // testPathIgnorePatterns: [
  //   '/node_modules/'
  // ],

  // The regexp pattern or array of patterns that Jest uses to detect test files
  // testRegex: [],

  // This option allows the use of a custom results processor
  // testResultsProcessor: null,

  // This option allows use of a custom test runner
  // testRunner: 'jasmine2',

  // Setting this value to 'fake' allows the use of fake timers for functions such as 'setTimeout'
  // timers: 'real',

  // An array of regexp pattern strings that are matched against all modules before the module loader will automatically return a mock for them
  // unmockedModulePathPatterns: undefined,

  // Indicates whether each individual test should be reported during the run
  // verbose: null,

  // An array of regexp patterns that are matched against all source file paths before re-running tests in watch mode
  // watchPathIgnorePatterns: [],

  // Whether to use watchman for file crawling
  // watchman: true,
};
