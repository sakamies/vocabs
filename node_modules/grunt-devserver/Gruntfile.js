module.exports = function(grunt) {
    initialize()
    loadTasks()
    describeGoals()

    function initialize() {
        var config = require('./Gruntconfig.js')
        grunt.initConfig(config)
    }

    function loadTasks() {
        grunt.loadTasks('tasks')
        grunt.loadNpmTasks('grunt-contrib-jshint')
        grunt.loadNpmTasks('grunt-mocha-test')
        grunt.loadNpmTasks('grunt-cucumber')
    }

    function describeGoals() {
        grunt.registerTask('default', 'devserver')
        grunt.registerTask('lint', 'jshint')
        grunt.registerTask('unit', ['mochaTest:unit'])
        grunt.registerTask('integration', ['mochaTest:integration'])
        grunt.registerTask('functional', ['cucumberjs'])
        grunt.registerTask('test', ['lint', 'unit', 'integration', 'functional'])
    }
}