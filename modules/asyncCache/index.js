const { resolve } = require('path')

export default function (moduleOptions) {
  const options = {
    ...moduleOptions,
    ...this.options.asyncCache
  }

  this.addPlugin({
    src: resolve(__dirname, 'asyncCachePlugin.js'),
    fileName: 'asyncCache.js',
    options
  })
}
