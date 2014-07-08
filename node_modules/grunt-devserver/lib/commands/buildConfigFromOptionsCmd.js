var serverTypes = require('../model/data/serverTypes.json')
var HttpConfig = require('../model/config/HttpConfig')
var HttpsConfig = require('../model/config/HttpsConfig')

module.exports = buildConfigFromOptionsCmd

function buildConfigFromOptionsCmd(options) {
    if(!options || !options.type || options.type === serverTypes.HTTP)
        return new HttpConfig(options)
    else if(options.type === serverTypes.HTTPS)
        return new HttpsConfig(options)
    throw new Error('unrecoginized server type')
}