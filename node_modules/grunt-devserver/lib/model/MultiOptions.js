var path = require('path')
  , _ = require('underscore')
  , OPTIONS_NAME = 'options'

MultiOptions.prototype.hasConfiguration = hasConfiguration
MultiOptions.prototype.getOptions = getOptions
MultiOptions.prototype.getConfigurationNames = getConfigurationNames
MultiOptions.prototype._loadOptionsFile = loadOptionsFile

/**
 * An options file containing one or more options configuration.  MultiOptions is used for grunt
 * or file based configurations that may have multiple configurations.
 * @param multioptions
 * @constructor
 */
function MultiOptions(multioptions) {
    if(typeof multioptions === 'string')
        multioptions = this._loadOptionsFile(multioptions)

    this.multioptions = multioptions || {}
}

function getOptions(name) {
    var options = _.clone(this.multioptions.options) || {}

    if(name)
        _.extend(options, this.multioptions[name])

    return options
}

function getConfigurationNames() {
    var names = []
      , name

    for(name in this.multioptions)
        if(this.hasConfiguration(name))
            names.push(name)

    return names
}

function hasConfiguration(name) {
    return this.multioptions.hasOwnProperty(name) && name !== OPTIONS_NAME
}

function loadOptionsFile(filename) {
    if(!filename)
        return {}

    return require(path.resolve(filename))
}

module.exports = MultiOptions