const reactNativeEsModules = ['@react-native', 'react-native'];

const externalLibsEsModules = ['@react-navigation', 'react-redux'];

const esModules = [...reactNativeEsModules, ...externalLibsEsModules].join('|');

const extensionFiles = ['ts', 'tsx', 'js', 'jsx', 'json', 'node'];

module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx}'],
  moduleFileExtensions: extensionFiles,
  testTimeout: 20000,
  coverageDirectory: '<rootDir>/coverage',
  transformIgnorePatterns: [`node_modules/(?!${esModules})`],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
