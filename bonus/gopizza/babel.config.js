module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: [
            '.ts',
            '.tsx',
            '.js',
            '.json'
          ],
          alias: {
            '@components': './src/components',
            '@screens': './src/screens',
            '@contexts': './src/contexts',
            '@routes': './src/routes',
            '@assets': './src/shared/assets',
            '@configs': './src/shared/configs',
            '@theme': './src/shared/theme/index.ts',
          }
        }
      ]
    ]
  };
};
