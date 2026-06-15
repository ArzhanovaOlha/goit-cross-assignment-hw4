module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // react-native-worklets/plugin must be last (reanimated 4.x uses worklets)
    'react-native-worklets/plugin',
  ],
};
