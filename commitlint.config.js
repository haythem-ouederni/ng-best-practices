// We adapt the commit lint to the local/custom commitizen configuration
const commitizenConfig = require('./.cz-config.js');

const typeEnum = commitizenConfig.types.map(type => type.value);
const scopes = commitizenConfig.scopes.map(scope => scope.name);

module.exports = {
  // we use the default @commitlint/config-conventional rules
  extends: ['@commitlint/config-conventional'],
  // Any rules defined here will override rules from @commitlint/config-conventional
  // => custom rules
  rules: {
    'header-max-length': [2, 'always', 100],
    'subject-case': [
      2,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case']
    ],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'scope-case': [2, 'always', 'lower-case'],
    'scope-enum': [2, 'always', scopes],
    'scope-empty': [2, 'never'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [2, 'always', typeEnum],
    'body-leading-blank': [1, 'always'],
    'footer-leading-blank': [1, 'always']
  }
};