var morgan = require('morgan')
  , corsSupport = require('../../middleware/corsSupport')
  , noCacheHeaders = require('../../middleware/noCacheHeaders')
  , serveStatic = require('serve-static')
  , serveFolder = require('serve-index')
  , path = require('path')
  , underscore = require('underscore')

function CommonConfig(options) {
    underscore.extend(this, CommonConfig._DEFAULT)
    applyOptions.call(this, options)
}

CommonConfig._defaultMiddleware = defaultMiddleware
CommonConfig._DEFAULT = { middleware: defaultMiddleware
                        , folder: process.cwd()
                        , cacheControl: 'no-cache'
                        }


function defaultMiddleware() {
    var absoluteFolder = path.resolve(this.folder)

    return [ morgan()
           , corsSupport()
           , noCacheHeaders(this.cacheControl)
           , serveStatic(this.folder)
           , serveFolder(absoluteFolder, { icons : true })
           ]
}

function applyOptions(options) {
    if(!options)
        return

    if(options.port)
        this.port = options.port
    if(options.base)
        this.folder = options.base
    if(options.cache)
        this.cacheControl = options.cache
    if(options.middleware)
        this.middleware = options.middleware
    this.options = options
}

module.exports = CommonConfig