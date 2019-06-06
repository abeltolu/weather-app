/**
 * @file Jest configuration.
 */

const ignoredModules = ['react-loader-spinner'].join('|');
module.exports = {
    rootDir: 'test',
    testRegex: 'test/.*test\\.js$',
    setupFiles: ['<rootDir>/setup.js'],
    transformIgnorePatterns: [`/node_modules/(?!${ignoredModules})`],
    transform: {
        "^.+\\.js$": "babel-jest",
        ".+\\.(css|styl|less|sass|scss)$": "jest-transform-css"
    },
    snapshotSerializers: ["enzyme-to-json/serializer"]
};
