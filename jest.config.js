module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
  ],
  testMatch: [
    '<rootDir>/src/**/*.spec.js?(x)',
  ],
  testEnvironment: 'node',
  testURL: 'http://localhost',
  transform: {
    '^.+\\.(js|jsx)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|css|json)$)': '<rootDir>/config/jest/fileTransform.js',
  },
  moduleFileExtensions: [
    'js',
    'json',
    'jsx',
  ],
};
