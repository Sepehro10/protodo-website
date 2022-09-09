const { resolve } = require('path')

export default function (moduleOptions) {
  const options = {
    ...moduleOptions,
    ...this.options.session
  }

  this.addPlugin({
    src: resolve(__dirname, 'sessionPlugin.js'),
    fileName: 'session.js',
    options
  })
}
