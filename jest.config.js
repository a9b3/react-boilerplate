module.exports = {
  "moduleNameMapper" : {
    "\\.!(jsx?|s?css)$": "<rootDir>/__mocks__/fileMocks.js",
    "\\.s?css$": "identity-obj-proxy"
  },
  "moduleFileExtensions": [
    "js",
    "jsx",
  ],
  "moduleDirectories": [
    "<rootDir>/src",
    "<rootDir>/node_modules",
  ],
}
