module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-px-to-viewport': {
      viewportWidth: 1366,
      viewportHeight: 768,
      unitPrecision: 5,
      viewportUnit: 'vw',
      selectorBlackList: ['.ignore', '.hairlines'],
      minPixelValue: 0,
      mediaQuery: false,
      exclude: /(\/|\\)(node_modules)(\/|\\)/
    }
  }
}
