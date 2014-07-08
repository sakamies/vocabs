var startServer = require('../lib/commands/startServerCmd.js')
  , loadCompleteOptions = require('../lib/commands/loadCompleteOptionsCmd.js')

function devserver(grunt) {
    grunt.registerMultiTask('devserver', 'Start a static web server.', devServerTask);

    function devServerTask() {
        var done = this.async()
          , options = loadCompleteOptions(this.options()).getOptions(this.target)
          , promise = startServer(options)

        promise.then(onServerStarted)

        function onServerStarted() {
            if(options.async === false)
                done()
        }

        return promise
    }
}

module.exports = devserver