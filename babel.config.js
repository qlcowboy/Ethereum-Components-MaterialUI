'use strict';

module.exports = {
  plugins: [
    ['@babel/plugin-transform-runtime',      {
      "corejs": false,
      "helpers": true,
      "regenerator": true,
      "useESModules": false
    }],
    '@babel/plugin-proposal-class-properties'],
  presets: ['@babel/preset-env'],
};