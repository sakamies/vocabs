var BasicOptions = require('../../../lib/model/BasicOptions.js')

describe('BasicOptionsTest', function() {
    describe('construction', function() {
        it('constructs without parameters', function() {
            var options = new BasicOptions()

            expect(options.options).to.deep.equal({})
            expect(options.servers).to.deep.equal([])
            expect(options.file).to.be.undefined
        })

        it('constructs with options', function() {
            var options = { server: 'one'
                          , port: 80
                          }
              , unit = new BasicOptions(options)

            expect(unit.options).to.deep.equal(options)
        })
    })

    describe('servers property', function() {
        it('returns an empty array when no server is defined', function() {
            var unit = new BasicOptions()

            expect(unit.servers).to.deep.equal([])
        })

        it('returns an array of one element when server is a string', function() {
            var options = { server: 'one' }
              , unit = new BasicOptions(options)

            expect(unit.servers).to.deep.equal([options.server])
        })

        it('returns an array of many elements when server is an array', function() {
            var options = { server: ['one', 'two'] }
              , unit = new BasicOptions(options)

            expect(unit.servers).to.deep.equal(options.server)
        })
    })

    describe('file property', function() {
        it('returns undefined when file is not defined', function() {
            var unit = new BasicOptions()

            expect(unit.file).to.be.undefined
        })

        it('returns a file', function() {
            var options = { file: 'devserver.json' }
              , unit = new BasicOptions(options)

            expect(unit.file).to.be.equal(options.file)
        })
    })

    describe('getOptions', function() {
        it('returns a clone of the options data', function() {
            var options = { port: 80 }
              , unit = new BasicOptions(options)

            expect(unit.getOptions()).to.not.be.equal(options)
            expect(unit.getOptions()).to.deep.equal(options)
        })

        it('strips server and file properties', function() {
            var options = { port: 80
                          , file: 'devserver.json'
                          , server: 'server'
                          }
              , expected = { port: options.port }
              , unit = new BasicOptions(options)

            expect(unit.getOptions()).to.deep.equal(expected)
        })
    })

    describe('getConfigurationNames', function() {
        it('returns an empty array', function() {
            var unit = new BasicOptions()

            expect(unit.getConfigurationNames()).to.deep.equal([])
        })
    })

    describe('hasConfiguration', function() {
        it('returns false', function() {
            var unit = new BasicOptions()

            expect(unit.hasConfiguration()).to.be.false
        })
    })
})