import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/indent': [
        'error',
        2,
        {
          SwitchCase: 1,
          ObjectExpression: 1,
          MemberExpression: 1,
          CallExpression: {
            arguments: 1,
          },
          'ignoredNodes': [
            'TSUnionType',
            'TSTypeParameterInstantiation',
            'VariableDeclarator'
          ],
        }
      ],
      'react-hooks/exhaustive-deps': 0,
      'one-var-declaration-per-line': 'error',
      'no-trailing-spaces': 'error',
      'react/jsx-closing-bracket-location': 'error',
      'react/jsx-first-prop-new-line': 'error',
      'react/jsx-max-props-per-line': ['error', { 'when': 'multiline' }],
      'jsx-quotes': ['error', 'prefer-double'],
      'import/no-extraneous-dependencies': 0,
    },
    ignorePatterns: [
      'node_modules/',
      'vite.config.ts',
    ],
  },
)
