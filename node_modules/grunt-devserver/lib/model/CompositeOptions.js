var _ = require('underscore')

CompositeOptions.prototype.hasConfiguration = hasConfiguration
CompositeOptions.prototype.getOptions = getOptions
CompositeOptions.prototype.getConfigurationNames = getConfigurationNames

/**
 * Composites together multiple option instances (BasicOptions, MultiOptions, etc...) Used when a command-line
 * or grunt configuration defines some options and then loads a file.
 * @param optionsList
 * @constructor
 */
function CompositeOptions(optionsList) {
    if(!!optionsList && !Array.isArray(optionsList))
        throw new Error('optionsList to be an array')

    this.optionsList = optionsList || []
}

function hasConfiguration(name) {
    var i = this.optionsList.length - 1

    for(;i >= 0; i--)
        if(this.optionsList[i].hasConfiguration(name))
            return true

    return false
}

function getOptions(name) {
    return this.optionsList.reduce(apply, {})

    function apply(composite, options) {
        return _.extend(composite, options.getOptions(name))
    }
}

function getConfigurationNames() {
    return this.optionsList.reduce(apply, [])

    function apply(names, options) {
        return _.union(names, options.getConfigurationNames())
    }
}


module.exports = CompositeOptions