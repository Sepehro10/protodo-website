const { resolve } = require('path')

export default function (moduleOptions) {
  const options = {
    ...moduleOptions,
    ...this.options.api
  }

  this.addPlugin({
    src: resolve(__dirname, 'apiPlugin.js'),
    fileName: 'api.js',
    options
  })
}
