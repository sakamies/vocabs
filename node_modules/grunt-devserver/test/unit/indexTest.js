var Sandbox = require('sandboxed-module')
  , devserver

describe('indexTest', function() {
    beforeEach(function() {
        devserver = require('../../')
    })

    describe('construction', function() {
        it('is correctly defined', function() {
            expect(devserver).to.be.a('function')
            expect(devserver.Server).to.be.a('function')
            expect(devserver.HttpConfig).to.be.a('function')
            expect(devserver.HttpsConfig).to.be.a('function')
            expect(devserver.BasicOptions).to.be.a('function')
            expect(devserver.MultiOptions).to.be.a('function')
            expect(devserver.CompositeOptions).to.be.a('function')
            expect(devserver.middleware).to.be.a('object')
            expect(devserver.middleware.corsSupport).to.be.a('function')
            expect(devserver.middleware.noCacheHeaders).to.be.a('function')
            expect(devserver.middleware.route).to.be.a('function')
        })
    })

    describe('devserver', function() {
        var startServerStub

        beforeEach(function() {
            var UNIT_UNDER_TEST_PATH = '../../lib/index.js'
              , requires = { './commands/startServerCmd.js' : startServerStub = sinon.stub() }

            devserver = Sandbox.require(UNIT_UNDER_TEST_PATH, { requires: requires })
        })

        it('hands off to startServerCmd', function() {
            var expected = {}
            var options = {}

            startServerStub.returns(expected)

            expect(devserver(options)).to.equal(expected)
            expect(startServerStub.firstCall.args[0]).to.equal(options)
        })
    })
})