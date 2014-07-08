var BasicOptions = require('../model/BasicOptions.js')
  , MultiOptions = require('../model/MultiOptions.js')
  , CompositeOptions = require('../model/CompositeOptions.js')

/**
 * Loads a complete set of configuration options.  If the options passed to the command contains a reference to
 * an options file then options will be loaded and merged with the original options and a new options object
 * is returned representing the full and complete options of the system.
 *
 * NOTE that recursive loading of options files is not supported to maintain simplicity. A strong use case
 * is not apparent for the recursive scenario.
 *
 * @param options an object literal containing user defined options
 * @returns CompositeObject
 */
function loadCompleteOptionsCmd(options) {
    if(!options || typeof options !== 'object')
        throw new Error('expected options object')

    if(!options.getOptions)
        options = new BasicOptions(options)

    return options.file ? new CompositeOptions([new MultiOptions(options.file), options]) : options
}

module.exports = loadCompleteOptionsCmd