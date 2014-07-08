var startServer = require('../../commands/startServerCmd')
  , Cli = require('../controller/Cli')
  , BasicOptions = require('../../model/BasicOptions')
  , loadCompleteOptions = require('../../commands/loadCompleteOptionsCmd')

function startFromConsoleCmd(cli) {
    cli = cli || new Cli()
    if(!cli.isHelpRequested())
        return runServer(cli.options)

    cli.showHelp()
}

function runServer(args) {
    var options = loadCompleteOptions(args)
      , servers = (new BasicOptions(args)).servers

    return (servers.length === 0) ? startNoConfigurationDefined(options) : startConfigurations(options, servers)
}

function startConfigurations(options, servers) {
    var promises = []

    servers.forEach(function(servername) {
        var promise
        if(!options.hasConfiguration(servername))
            throw new Error('server configuration "' + servername + '" does not exist!')
        promise = startServer(options.getOptions(servername))
        promises.push(promise)
    })

    return  promises
}

function startNoConfigurationDefined(options) {
    var configNames = options.getConfigurationNames()

    return (configNames.length === 0) ? startServer(options.getOptions()) : startConfigurations(options, configNames)
}

module.exports = startFromConsoleCmd;