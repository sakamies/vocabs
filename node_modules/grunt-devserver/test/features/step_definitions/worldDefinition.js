require('../../common.js')

function worldDefinition() {
    this.World = require('../support/World.js')

    this.After(function(callback) {
        this.stopAllServers()
        callback()
    })
}

module.exports = worldDefinition