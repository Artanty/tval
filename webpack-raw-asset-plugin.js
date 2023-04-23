class RawAssetPlugin {
  static defaultOptions = {
    module: '',
    asset: '',
    moduleAppendDelimiter: '__',
    modulePrependDelimiter: '/',
    fullAssetName: '',
    uniqueAssetName: '',
    
  };
  currentPathName = ''
  constructor(options = {}) {
    this.options = { ...RawAssetPlugin.defaultOptions, ...options };
  }

  findAsset (pathname, source) {
    const getModuleName = (pathname, module, moduleAppendDelimiter, modulePrependDelimiter) => {
      try {
        const moduleWithPrependDelimiterRegex = new RegExp(modulePrependDelimiter + module + moduleAppendDelimiter, "g")
        const matchedModuleWithDelimiters = pathname.match(moduleWithPrependDelimiterRegex)
        if (matchedModuleWithDelimiters && Array.isArray(matchedModuleWithDelimiters) && matchedModuleWithDelimiters.length > 0) {
          const moduleDelimitersReplace = new RegExp(modulePrependDelimiter + "|" + moduleAppendDelimiter, "g")
          return matchedModuleWithDelimiters[0].replace(moduleDelimitersReplace, "")
        } else {
          // throw new Error('no matchedModuleWithDelimiters')
        }
      } catch(e) {
        console.warn(e)
      }
    }
    const getAssetName = (pathname, module, moduleAppendDelimiter, modulePrependDelimiter) => {
      try {
        const splitResult = pathname?.split(`${modulePrependDelimiter + module + moduleAppendDelimiter}`)
        if (splitResult && Array.isArray(splitResult) && splitResult.length > 1) {
          return splitResult[1]
        } else {
          throw new Error('WRONG ASSET NAME RESULT WHILE SPLITTING PATHNAME')
        }
      } catch (e) {
        console.warn(e)
      }
    }
    const checkAssetStructure = (source) => {
      console.log(source)
      result = false
      if (source._source?._children && Array.isArray(source._source?._children)) {
        result = true
        return result
      } else {
        throw new Error('UNKNOWN ASSET STRUCTURE')
      }
    }

    let result = false
    const { module, asset, moduleAppendDelimiter, modulePrependDelimiter, fullAssetName, uniqueAssetName } = this.options
    if (module && asset) {
      try {
        const moduleAppendDelimiterRegex = new RegExp(moduleAppendDelimiter, "g")
        if (pathname && pathname?.match(moduleAppendDelimiterRegex)) {
          const moduleName = getModuleName(pathname, module, moduleAppendDelimiter, modulePrependDelimiter)
          if (moduleName === module) {
            const assetName = getAssetName(pathname, module, moduleAppendDelimiter, modulePrependDelimiter)
            if (assetName && assetName === asset) {
              result = checkAssetStructure(source)
            } else {
              // throw new Error('ASSET NAME DOESN\'T MATCH')
            }
          } else {
            // throw new Error('MODULE NAME DOESN\'T MATCH')
          }
        }
      } catch(e) {
        console.warn(e)
      }
    } else if (fullAssetName) {
      if (pathname === fullAssetName) {
        result = checkAssetStructure(source)
      }
    } else if (uniqueAssetName) {
      const uniqueAssetNameRegex = new RegExp(uniqueAssetName, "g")
      if (pathname.match(uniqueAssetNameRegex)) {
        result = checkAssetStructure(source)
      }
    } else {
      console.warn('VALID PARAMETERS CAN BE ONE OF THESE:')
      console.warn("1. module (\'server\') & asset: (\'example.js\'). optional: moduleAppendDelimiter default = \'__\'. Generated filename must be \'server__example.js\'")
      console.warn("2. fullAssetName (\'examples/server/server__example.js\')")
      console.warn("3. uniqueAssetName (\'ples/server/ser\')")
    }
    return result
  }

  apply(compiler) {
    const pluginName = RawAssetPlugin.name;
    const { webpack } = compiler;
    const { Compilation } = webpack;
    const { RawSource } = webpack.sources;
    compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: pluginName,
          stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE,
        },
        (assets) => {
          let content = ''
          Object.entries(assets).forEach(([pathname, source]) => {
            if (this.findAsset(pathname, source)) {
              this.currentPathName = pathname
              try {
                content = source._source?._children?.reduce((acc, curr) => {
                  acc += (typeof curr === 'object' && 
                  curr._source && 
                  curr._source?._source && 
                  curr._source?._source?._value && 
                  !String(curr._source._source._value).includes('mini-css-extract-plugin')) ?
                    curr._source?._source?._value : ''
                  return acc
                }, '')
              } catch(e) {
                console.warn(e)
              }
            }         
          })
          if (content.length) {
            compilation.deleteAsset(this.currentPathName)          
            compilation.emitAsset(
              this.currentPathName,
              new RawSource(content)
            )
          }
        }
      );
    });
  }
}

module.exports = RawAssetPlugin