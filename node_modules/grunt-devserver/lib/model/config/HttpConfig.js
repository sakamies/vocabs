var serverTypes = require('./../data/serverTypes.json')
  , underscore = require('underscore')
  , CommonConfig = require('./CommonConfig')

/**
 * Configuration for a HTTP server
 * @constructor
 */
function HttpConfig(options) {
    underscore.extend(this, HttpConfig._DEFAULT)
    CommonConfig.call(this, options)
    this.type = serverTypes.HTTP
}

HttpConfig.prototype = Object.create(CommonConfig.prototype)
HttpConfig._DEFAULT = { port: 8888 }

module.exports = HttpConfig