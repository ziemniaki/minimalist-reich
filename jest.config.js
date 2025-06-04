export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.ts$': ['ts-jest', { useESM: true, tsconfig: 'tsconfig.test.json' }]
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(tone)/)'
  ],
  moduleNameMapper: {
    "^tone$": "<rootDir>/node_modules/tone/build/Tone.js",
    '^(.*)\\.js$': '$1'
  },
  extensionsToTreatAsEsm: ['.ts']
};
