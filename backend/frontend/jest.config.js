module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: ['<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
  },
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {},
    transformIgnorePatterns: ['/node_modules/(?!(react-pdf)/)'],
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'], // Adjust the path as needed

  collectCoverage: true,
  // if coverage not collected, delete node modules and reinstall dependencies.
  collectCoverageFrom: ['<rootDir>/src/components/**/*.tsx'],
};
