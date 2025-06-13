/** @type {import('jest').Config} */
module.exports = {
  bail: true,
  roots: ['<rootDir>/__tests__'],
  clearMocks: true,
  maxWorkers: 1,
  collectCoverage: false,
  collectCoverageFrom: [
    'src/domain/entities/**/*.ts',
    'src/infra/data/adapters/**/*.ts',
    'src/infra/database/*.ts',
    'src/infra/gateway/**/*.ts',
    'src/main/**/*.ts',
    'src/presentation/controllers/**/*.ts',
    'src/presentation/guards/**/*.ts',
    'src/services/usecases/**/*.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'html'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t|j)s$': '@swc/jest',
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '^#tests/(.*).js': '<rootDir>/__tests__/$1',
    '^#(.*).js$': '<rootDir>/src/$1',
  },
  testRegex: ['__tests__/.+spec.ts'],
}
