var createMiddleware = require('./createMiddlewareCmd')
var Server = require('../controller/Server')
var Q = require('q')
var http = require('http')
var https = require('https')
var serverTypes = require('../model/data/serverTypes.json')

module.exports = buildServerCmd

/**
 * Builds a Server wrapper interface from a config to provide basic standard controls for varying server types
 * @param config {HttpConfig|HttpsConfig} a supported configuration for building a server
 * @returns {Q.promise}
 */
function buildServerCmd(config) {
    var deferred = Q.defer()
      , app

    try {
        assertConfig(config)
        app = createMiddleware(config)
        createServer(config, app).then(onServerCreated, deferred.reject)
    } catch(error) {
        deferred.reject(error)
    }

    return deferred.promise

    function onServerCreated(server) {
        deferred.resolve(new Server(config, server, app))
    }
}

function assertConfig(config) {
    if(!config)
        throw new Error('server configuration must be present')
    if(!config.type)
        throw new Error('server type not specified');
}

function createServer(config, app) {
    if(config.type === serverTypes.HTTPS)
        return createHttpsServer(config, app)
    else if(config.type === serverTypes.HTTP) {
        var server = createHttpServer(app)
        /* jshint newcap: false */
        return Q(server)
    }


    throw new Error('unknown server type')
}

function createHttpsServer(config, app) {
    var deferred = Q.defer()

    config.httpsOptions.then(function (httpsOptions) {
        return https.createServer(httpsOptions, app)
    }).then(deferred.resolve, deferred.reject)

    return deferred.promise
}

function createHttpServer(app) {
    return http.createServer(app)
}