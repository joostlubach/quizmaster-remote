const Path = require('path')

module.exports = {
  getTransformModulePath() {
    return require.resolve('react-native-typescript-transformer')
  },
  getSourceExts() {
    return ['ts', 'tsx'];
  },
  getProjectRoots() {
    return [
      Path.resolve(__dirname, '.'),
      Path.resolve(__dirname, './src'),
      Path.resolve(__dirname, './pkg'),
      Path.resolve(__dirname, './node_modules')
    ]
  }
}