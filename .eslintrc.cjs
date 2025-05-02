module.exports = {
  extends: ['prettier'],
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@actions/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@lib/constants',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@lib/enums',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@lib/mappings',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@lib/translations',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@lib/types',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@lib/utils',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@lib/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@components/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@core/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@/**',
            group: 'internal',
            position: 'after',
          },
        ],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'always',
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
