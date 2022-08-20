const jestPreset = require('@wordpress/jest-preset-default/jest-preset');

// Modify the jest preset to support for unit and integration tests.
const config = {
    ...jestPreset,
    transformIgnorePatterns: ['node_modules/(?!@wordpress)/'],
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'ts-jest',
    },
};

config.setupFilesAfterEnv.push(require.resolve('./tests/unit/config/testing-library.js'))

module.exports = config;