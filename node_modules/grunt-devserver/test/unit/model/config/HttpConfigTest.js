var SandboxedModule = require('sandboxed-module')
  , serverTypes = require('../../../../lib/model/data/serverTypes.json')

describe('HttpConfigTest', function() {
    var CommonConfigStub, HttpConfig

    beforeEach(function() {
        var unitUnderTestPath = '../../../../lib/model/config/HttpConfig.js'
          , requires = { './CommonConfig': CommonConfigStub = sinon.stub() }

        HttpConfig = SandboxedModule.require(unitUnderTestPath, { requires: requires })
    })

    describe('construction', function() {
        it('extends CommonConfig', function() {
            var config = new HttpConfig()
            expect(config).to.be.an.instanceof(CommonConfigStub)
        })

        it('constructor calls CommonConfig constructor', function() {
            var options = {}

            new HttpConfig(options)
            expect(CommonConfigStub.calledOnce).to.be.true
            expect(CommonConfigStub.firstCall.args[0]).to.deep.equal(options)
        })

        it('adds default options', function() {
            var config = new HttpConfig()

            expect(config.port).to.be.equal(HttpConfig._DEFAULT.port)
        })

        it('sets the type', function() {
            var config = new HttpConfig()

            expect(config.type).to.be.equal(serverTypes.HTTP)
        })
    })
});