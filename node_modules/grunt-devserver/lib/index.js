var startServer = require('./commands/startServerCmd')

function devserver(options) {
    return startServer(options)
}

devserver.Server = require('./controller/Server.js')
devserver.HttpConfig = require('./model/config/HttpConfig.js')
devserver.HttpsConfig = require('./model/config/HttpsConfig.js')
devserver.BasicOptions = require('./model/BasicOptions.js')
devserver.MultiOptions = require('./model/MultiOptions.js')
devserver.CompositeOptions = require('./model/CompositeOptions.js')
devserver.middleware = { corsSupport: require('./middleware/corsSupport')
                       , noCacheHeaders: require('./middleware/noCacheHeaders')
                       , route: require('./model/middleware/Route')
                       }

module.exports = devserver