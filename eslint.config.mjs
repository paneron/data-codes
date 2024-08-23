//
// Converted from .eslintrc.js with:
// > npx @eslint/migrate-config .eslintrc.js
//

import tsParser from '@typescript-eslint/parser';
import jsoncParser from 'jsonc-eslint-parser';
import jest from 'eslint-plugin-jest';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory     : __dirname,
  recommendedConfig : js.configs.recommended,
  allConfig         : js.configs.all
});

const rulesForJs = {
  'quotes' : [
    'warn',
    'single',
    { avoidEscape : true },
  ],
  'require-jsdoc' : ['off'],
  'valid-jsdoc'   : ['off'],
  'indent'        : [
    'error',
    2,
    {
      SwitchCase         : 1,
      VariableDeclarator : {
        'var'   : 2,
        'let'   : 2,
        'const' : 3,
      },
      ignoredNodes : ['ConditionalExpression'],
    },
  ],
  'key-spacing' : [
    'error',
    {
      singleLine : {
        beforeColon : true,
        afterColon  : true,
      },
      multiLine : {
        beforeColon : true,
        afterColon  : true,
        align       : 'colon',
      },
    },
  ],
  'keyword-spacing' : [
    'error',
    {
      before : true,
      after  : true,
    },
  ],
  'spaced-comment' : [
    'error',
    'always',
    {
      exceptions : ['-', '+', '=', '*'],
      markers    : ['=', '*/', '/*', 'X', '//'],
    },
  ],
  'no-multi-spaces' : [
    1,
    {
      exceptions : {
        VariableDeclarator : true,
      },
    },
  ],
  'no-cond-assign' : [2, 'except-parens'],
  // "no-redeclare"   : [
  //   "error",
  //   {
  //     builtinGlobals : true,
  //   },
  // ],
  'no-redeclare'   : 'off',
  'dot-notation'   : [
    2,
    {
      allowKeywords : true,
    },
  ],
  'eqeqeq'      : [2, 'smart'],
  'no-plusplus' : [
    'warn',
    {
      allowForLoopAfterthoughts : true,
    },
  ],
  'one-var' : [
    'off', // Enable once tests are set up
    'consecutive',
  ],
  'object-curly-spacing' : [
    'error',
    'always',
    {
      objectsInObjects : false,
      arraysInObjects  : false,
    },
  ],
  'quote-props' : [
    'error',
    'consistent-as-needed',
    {
      keywords : true,
    },
  ],
  'camelcase' : ['warn'],
  'max-len'   : ['warn', {
    code : 140,
  }],
  'new-cap' : ['warn'],

  'key-spacing' : [
    'error',
    {
      singleLine : {
        beforeColon : true,
        afterColon  : true,
      },
      multiLine : {
        beforeColon : true,
        afterColon  : true,
        align       : 'colon',
      },
    },
  ],
  'no-empty-function' : 'off',
  'no-unused-vars'    : 'off',
};

const rulesForTypescript = {
  '@typescript-eslint/no-redeclare'                            : ['error'],
  '@typescript-eslint/no-empty-function'                       : 'off',
  '@typescript-eslint/no-non-null-asserted-nullish-coalescing' : 'warn',
  '@typescript-eslint/no-unused-vars'                          : ['warn', {
    varsIgnorePattern : '^_',
    argsIgnorePattern : '^_' ,
  }],
  '@typescript-eslint/consistent-type-imports' : 'error',
};

const rules = {
  ...rulesForJs,
  ...rulesForTypescript,
};

export default [{
  ignores : ['**/dist/'],
}, {
  languageOptions : {
    globals : {},
  },
}, ...compat.extends(
  'eslint:recommended',
  'plugin:@typescript-eslint/strict',
).map(config => ({
  ...config,
  files : ['**/*.ts', '**/*.tsx'],

  languageOptions : {
    parser      : tsParser,
    ecmaVersion : 5,
    sourceType  : 'script',

    parserOptions : {
      project : path.join(__dirname, 'tsconfig.eslint.json'),
    },
  },

  settings : {
    'import/resolver' : {
      typescript : {},
    },
  },

  rules : rules,
})), {
  files : ['**/*.js', '**/*.mjs'],

  rules : rulesForJs,
}, ...compat.extends('plugin:jsonc/recommended-with-jsonc').map(config => ({
  ...config,
  languageOptions : {
    parser : jsoncParser,
  },
  files : ['**/*.json', '**/*.json5', '**/*.jsonc'],
})), ...compat.extends(
  'plugin:jest/recommended',
  'plugin:jest/style',
).map(config => ({
  ...config,
  files : ['spec/**'],
})), {
  files : ['spec/**'],

  plugins : {
    jest,
  },

  rules : {
    'jest/prefer-expect-assertions' : 'off',
  },
}];
