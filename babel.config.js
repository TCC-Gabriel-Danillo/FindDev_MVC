module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '_assets': './assets',
            '_actions': './src/actions',
            '_store': './src/store',
            '_types': './src/types',
            '_views': './src/views',
            "_": "./src"
          },
          extensions: [
            ".js",
            ".jsx",
            ".ts",
            ".tsx",
          ]
        },
      ]
   ],
  };
};