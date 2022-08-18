module.exports = {
    rootDir: './',
    testEnvironment: 'jsdom',
    collectCoverageFrom: [
        'src/**/*.{js,jsx,ts,tsx}',
        '!**/node_modules/**',
        '!**/vendor/**',
        '!**/tests/**',
    ],
    moduleDirectories: ['node_modules'],
    preset: '@wordpress/jest-preset-default',
    testPathIgnorePatterns: ['/node_modules/', '/test/e2e'],
    transformIgnorePatterns: ['node_modules/(?!@wordpress)/'],
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'ts-jest',
    },
};
