module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'tsconfig.app.json' }],
  },
  setupFiles: ['<rootDir>/jest.polyfill.ts'], // Polyfills first
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Testing-library matchers
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
};
