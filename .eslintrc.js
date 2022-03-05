module.exports = {
  parser: '@typescript-eslint/parser',

  extends: [
    'next/core-web-vitals',
    'prettier',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],

  plugins: ['react-hooks', 'import'],

  rules: {
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'import/extensions': [
      'error',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    '@typescript-eslint/no-extra-semi': ['off'],
    'no-unused-expressions': ['off'],
    '@typescript-eslint/no-unused-expressions': ['error'],
    'no-shadow': ['off'],
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/no-use-before-define': ['off'],
    '@typescript-eslint/member-delimiter-style': ['off'],
    '@typescript-eslint/triple-slash-reference': ['error'],
    '@typescript-eslint/jsx-no-lambda': ['off'],
    '@typescript-eslint/explicit-function-return-type': ['off'],
    '@typescript-eslint/ban-types': ['off'],
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/explicit-module-boundary-types': ['off'],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variable',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        leadingUnderscore: 'allow',
      },
      {
        selector: 'function',
        format: ['camelCase', 'PascalCase'],
      },
      {
        selector: 'objectLiteralMethod',
        format: ['camelCase', 'PascalCase'],
      },
      {
        selector: 'parameter',
        format: ['camelCase', 'PascalCase'],
        leadingUnderscore: 'allow',
      },
      {
        selector: ['typeLike', 'enumMember'],
        format: ['PascalCase'],
      },
      {
        selector: ['typeProperty', 'classProperty'],
        format: ['camelCase', 'PascalCase'],
        leadingUnderscore: 'allow',
      },
    ],

    'react/prop-types': ['off'],
    'react/display-name': ['off'],
    'react/self-closing-comp': ['error'],
    'react-hooks/rules-of-hooks': ['error'],
    'react-hooks/exhaustive-deps': ['error'],
    'jsx-a11y/anchor-is-valid': ['off'],
  },

  settings: { react: { version: 'detect' } },
}
