module.exports = {
  extends: ['@commitlint/config-conventional', 'cz'],
  rules: {
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never']
  }
};
