var Q = require('q')
  , Cli = require('../../../lib/cli/controller/Cli')
  , startFromConsoleCmd = require('../../../lib/cli/commands/startFromConsoleCmd')

cliInterface.prototype.run = run
cliInterface.prototype._startWithParameters = startWithParameters
cliInterface.prototype._cleanParameters = cleanParameters

module.exports = cliInterface

function cliInterface() {
    this.configFile = {}
    this.servers = []
}

function run(parameters, callback) {
    var self = this
      , promise = this._startWithParameters(parameters)

    promise.then(function(server) {
        if(Array.isArray(server))
            self.servers = server
        else
            self.servers.push(server)
        callback()
    }).fail(callback)
}

function startWithParameters(parameters) {
    var argv = this._cleanParameters(parameters)
      , cli = new Cli(argv)
      , promise = startFromConsoleCmd(cli)

    if(Array.isArray(promise))
        return Q.all(promise)
    return promise
}

function cleanParameters(params) {
    if(!params)
        return ''
    if(this.configFile.name && this.configFile.path)
        params = params.replace(this.configFile.name, this.configFile.path)
    params = params.trim()

    return params.split(' ')
}

module.exports = cliInterface