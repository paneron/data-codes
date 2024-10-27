/** @type {import('ts-jest').JestConfigWithTsJest} */

import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

const _pathsToModuleName: Record<string, string | string[]> = pathsToModuleNameMapper(
  compilerOptions.paths,
  { prefix : '<rootDir>/' },
) ?? {};

const pathsToModuleName: Record<string, string | string[]> = {} as Record<string, string | string[]>;

function isString(v : string | string[]): v is string {
  return !Array.isArray(v);
}

const transformPathsForJest = (rhs : string ) : string => {
  return rhs.replace(/^\.\//, '<rootDir>/../');
}

Object.entries(_pathsToModuleName).forEach(([key, value]) => {
  const newValue = isString(value) ?
    transformPathsForJest(value) :
    value.map(transformPathsForJest);

  pathsToModuleName[key] = newValue;
})

pathsToModuleName['^(\\.{1,2}/.*)\\.js$'] = '$1';

export default {
  preset    : 'ts-jest',
  // preset: 'ts-jest/presets/default-esm', // or other ESM presets
  roots     : ['src'],
  transform : {
    // '^.+\\.[tj]sx?$' to process ts,js,tsx,jsx with `ts-jest`
    // '^.+\\.m?[tj]sx?$' to process ts,js,tsx,jsx,mts,mjs,mtsx,mjsx with `ts-jest`
    '\\.tsx?$' : [
      'ts-jest',
      {
        useESM : true,
      },
    ],
    '\\.(?:tsv|tab)$' : '<rootDir>/textFileTransformer.mjs',
  },
  moduleDirectories : [
    'src',
    'node_modules',
  ],
  moduleFileExtensions : [
    'ts',
    'js',
    'tab',
    'tsv',
  ],
  testEnvironment        : 'node',
  extensionsToTreatAsEsm : ['.ts', '.tsx', '.tab', '.tsv'],
  moduleNameMapper       : pathsToModuleName,
  testPathIgnorePatterns : [
    '/node_modules/',
    '/dist/',
  ],
};
