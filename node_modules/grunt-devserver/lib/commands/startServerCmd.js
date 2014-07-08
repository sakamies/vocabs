var loadCompleteOptions = require('./loadCompleteOptionsCmd')
var buildConfigFromOptions = require('./buildConfigFromOptionsCmd')
var buildServer = require('./buildServerCmd')
var Q = require('q')

/**
 * Given a set of options starts a server
 * @param options a set of options
 * @returns {Q.promise} a promise notifying of server start
 */
function startServerCmd(options) {
    var deferred = Q.defer()
    var config

    try {
        options = loadOptions(options)
        config = buildConfigFromOptions(options)
        buildServer(config).then(onServerBuilt, onServerBuildFailed)
    } catch(error) {
        deferred.reject(error)
    }

    return deferred.promise


    function onServerBuilt(server) {
        server.start().then(deferred.resolve, onServerStartFailed)
    }

    function onServerBuildFailed(error) {
        var msg = (error && error.message) || 'of no good reason'
        console.error('failed to build server because ' + msg)
        deferred.reject(error)
    }

    function onServerStartFailed(error) {
        var msg = (error && error.message) || 'of no good reason'
        console.error('failed to start server becaue ' + msg)
        deferred.reject(error)
    }
}

function loadOptions(options) {
    if(options)
        options = loadCompleteOptions(options).getOptions()
    return options
}

module.exports = startServerCmd