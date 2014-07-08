var _ = require('underscore')

BasicOptions.prototype.hasConfiguration = hasConfiguration
BasicOptions.prototype.getOptions = getOptions
BasicOptions.prototype.getConfigurationNames = getConfigurationNames


/**
 * A single options configuration.
 * @param options an object literal containing runtime options
 * @constructor
 */
function BasicOptions(options) {
    this.options = options || {}

    initProperties.call(this)
}

function initProperties() {
    var self = this

    Object.defineProperty(this, 'servers', { get: getServers });
    Object.defineProperty(this, 'file', { get: getFile });

    function getServers() {
        var servers = self.options.server
        if(typeof servers === 'string')
            return [servers]
        else if(Array.isArray(servers))
            return servers
        return []
    }

    function getFile() {
        return self.options.file
    }
}

function getOptions() {
    return stripConfigData(_.clone(this.options))
}

function getConfigurationNames() {
    return []
}

function hasConfiguration() {
    return false
}

function stripConfigData(options) {
    delete options.server;
    delete options.file;
    return options
}

module.exports = BasicOptions