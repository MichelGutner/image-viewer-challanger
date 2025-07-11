const path = require('path');

const plugins = [
  [
    'module-resolver',
    {
      extensions: ['.js', '.ts', '.json', '.jsx', '.tsx'],
      root: ['./'],
      alias: {
        '@': path.join(__dirname, './src'),
      },
    },
  ],
  'react-native-reanimated/plugin',
];

module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins,
};
