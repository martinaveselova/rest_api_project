module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  env: {
    node: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  extends: ['eslint:recommended', 'airbnb-base', 'plugin:@typescript-eslint/recommended', 'prettier'],
  plugins: ['@typescript-eslint', 'prettier', 'import'],
  rules: {
    '@typescript-eslint/ban-ts-comment': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      // all variables, functions and properties follow are camelCase
      { selector: 'variableLike', format: ['camelCase'] },
      // Class members are camelCase
      {
        selector: ['memberLike'],
        format: ['camelCase'],
      },
      {
        selector: ['memberLike'],
        modifiers: ['private'],
        format: ['camelCase'],
        leadingUnderscore: 'allow',
      },
      // Class names are PascalCase
      { selector: 'class', format: ['PascalCase'] },
      // Enums
      { selector: 'enum', format: ['PascalCase'] },
      { selector: 'enumMember', format: ['PascalCase'] },
      // boolean variables are prefixed with an allowed verb
      {
        selector: 'variable',
        types: ['boolean'],
        format: ['PascalCase'],
        prefix: ['is', 'should', 'has', 'can', 'did', 'will'],
      },
      {
        selector: 'variable',
        modifiers: ['const'],
        format: ['camelCase', 'UPPER_CASE'],
      },
    ],
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-floating-promises': 'warn',
    '@typescript-eslint/no-misused-promises': 'warn',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/prefer-optional-chain': 'error',
    'class-methods-use-this': 'off', // unwanted
    complexity: ['error', { max: 19 }], // Limit Cyclomatic Complexity
    'import/extensions': 'off', // unwanted
    'import/named': 'off', // checks typescript
    'import/no-unresolved': 'off', // checks typescript
    'import/order': [
      'error',
      {
        'newlines-between': 'never',
        pathGroupsExcludedImportTypes: ['internal'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
        pathGroups: [
          {
            pattern: 'src/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@{App,Common}/**',
            group: 'internal',
          },
          {
            pattern: '@{App,Common}',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@*/*', // scoped packages
            group: 'external',
            position: 'after',
          },
        ],
      },
    ],
    'import/prefer-default-export': 'off',
    'max-classes-per-file': 'off', // unwanted
    'no-continue': 'off', // @see https://github.com/airbnb/javascript/issues/1103
    'no-empty-function': ['error', { allow: ['constructors'] }],
    'no-param-reassign': 'off', // unwanted
    'no-plusplus': 'off', // @see https://github.com/airbnb/javascript/issues/1795
    'no-restricted-syntax': ['error', 'ForInStatement', 'LabeledStatement', 'WithStatement'],
    'no-shadow': 'off', // breaks TS enums, god will ever know why
    'no-undef': 'off', // @see https://github.com/eslint/typescript-eslint-parser/issues/437
    'no-underscore-dangle': 'off', // unwanted
    'no-useless-catch': 'off', // unwanted
    'no-useless-constructor': 'off', // unwanted
    'no-void': ['error', { allowAsStatement: true }],
    'prefer-promise-reject-errors': 'off', // unwanted
    'prettier/prettier': 'error',
    'import/no-extraneous-dependencies': 'off',
  },
}
