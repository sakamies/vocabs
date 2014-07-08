var cliInterface = require('../interface/cliInterface.js')

function cliDefinitions() {
    this.Given(/^I am using the command line$/, function(callback) {
        this.interface = new cliInterface()
        callback()
    })

    this.When(/^I run devserver$/, function(callback) {
        this.interface.run(undefined, callback)
    })

    this.When(/^I run devserver with the configuration:$/, function(parameters, callback) {
        this.interface.run(parameters, callback)
    })

    this.Given(/^an external configuration file named "([^"]*)" with contents:$/, function(name, configuration, callback) {
        this.interface.configFile = this.createConfigurationFile(name, configuration)
        callback()
    })
}

module.exports = cliDefinitions