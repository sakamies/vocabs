var Q = require('q')

module.exports = Server
Server.prototype.start = startServer
Server.prototype.stop = stopServer

function Server(config, server, app) {
    this.config = config
    this.app = app
    this.httpServer = server
}

function startServer() {
    var port = this.config.port
      , deferred = Q.defer()
      , self = this

    try {
        console.log('starting server on ' + port)
        this.httpServer.listen(port, onListening)
    } catch(error) {
        deferred.reject(error)
    }

    return deferred.promise

    function onListening() {
        console.log('listening on ' + port)
        deferred.resolve(self)
    }
}

function stopServer() {
    console.log('stopping server')
    this.httpServer.close()
}