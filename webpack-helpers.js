function reassignPaths (compilation, assets, assetTags, options, reassignOptions) {
  const getAssignAttr = (tagName) => tagName === 'script' ? 'src' : 'href'
  if (reassignOptions && Array.isArray(reassignOptions)) {
    reassignOptions.forEach(reassign => {
      assetTags.headTags.forEach(el => {
        if (reassign.match && reassign.match.length && reassign.tagName) {
          const regex = new RegExp(reassign.match, "g")
          if (el.tagName === reassign.tagName && el.attributes?.[getAssignAttr(el.tagName)]?.match(regex)) {
            el.attributes[getAssignAttr(el.tagName)] = reassign.newPath
          }
        }
      })
    })
  }
  return {
    compilation,
    webpackConfig: compilation.options,
    htmlWebpackPlugin: {
      tags: assetTags,
      files: assets,
      options
    }    
  };
}
module.exports = { reassignPaths }