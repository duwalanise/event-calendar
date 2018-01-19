module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  parser: 'babel-eslint',
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      modules: true,
      jsx: true
    },
    sourceType: 'module'
  },
  plugins: ['react', 'react-native']
};
