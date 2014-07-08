var World = require('../support/World.js')

function gruntDefinitions() {
    this.World = World

    this.Given(/^I am using grunt$/, function(callback) {
        // express the regexp above with the code you wish you had
        callback.pending();
    });

    this.When(/^I run grunt$/, function(callback) {
        // express the regexp above with the code you wish you had
        callback.pending();
    });

    this.When(/^I run grunt with the configuration:$/, function(string, callback) {
        // express the regexp above with the code you wish you had
        callback.pending();
    });

}

module.exports = gruntDefinitions