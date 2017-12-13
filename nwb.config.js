module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ReactAvenue',
      externals: {
        react: 'React'
      }
    }
  },
  karma: {
    browsers: ['ChromeHeadless']
  }
}
