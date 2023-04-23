const HtmlWebpackPlugin = require('html-webpack-plugin')
/**
 * Prepend content before first <script> tag
 * todo: 
 * arr of contents, 
 * position to inject for each, 
 * add injected content in HtmlWebpackPlugin options,
 * set module to inject
 */
class HtmlInjectRaw {
  content = ''
  entries = []
  constructor(options = {}) {
    this.content = options.content
    this.entries = options.entries
  }
  allowApplyToChunk (data, entries) {
    let result = false
    if (entries && Array.isArray(entries) && entries.length > 0) {
      if (data.plugin?.userOptions?.chunks && Array.isArray(data.plugin.userOptions.chunks) && data.plugin.userOptions.chunks.length > 0) {
        const currentChunk = data.plugin.userOptions.chunks[0]
        if (entries.includes(currentChunk)) {
          result = true
        }
      }
    } else {
      result = true
    }
    return result
  }
  apply (compiler) {
    compiler.hooks.compilation.tap('HtmlInjectRaw', (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        'HtmlInjectRaw',
        (data, cb) => {
          if (this.allowApplyToChunk(data, this.entries)) {
            if (data.html && typeof data.html) {
              let startPart = data.html?.slice(0, data.html.indexOf('<script '))
              const endPart = data.html?.slice(data.html.indexOf('<script '), data.html.length)
              data.html = startPart + this.content + endPart
            }
            /**
             * small beautify
             */
            const splittedByScriptEnd = data.html.split('</script>')
            data.html = splittedByScriptEnd.join('</script>\n')
            const splittedByHeadEnd = data.html.split('</head>')
            data.html = splittedByHeadEnd.join('\n</head>')
          }
          cb(null, data)
        }
      )
    })
  }
}

module.exports = HtmlInjectRaw