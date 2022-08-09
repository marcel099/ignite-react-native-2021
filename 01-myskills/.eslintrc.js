module.exports = {
  env: {
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:react/jsx-runtime',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'import/prefer-default-export': 'off',
    noUseBeforeDefine: 'off',
    'react/jsx-no-bind': 'off',
    'react/prop-types': 'off',
    'react/jsx-filename-extension': 'off',
  },
};
