var SandboxedModule = require('sandboxed-module')
  , serverTypes = require('../../../../lib/model/data/serverTypes.json')

describe('HttpsConfigTest', function() {
    var CommonConfigStub, HttpsConfig, defaultOptions

    beforeEach(function() {
        var unitUnderTestPath = '../../../../lib/model/config/HttpsConfig.js'
          , requires = { './CommonConfig': CommonConfigStub = sinon.stub() }

        HttpsConfig = SandboxedModule.require(unitUnderTestPath, { requires: requires })
        defaultOptions = { httpsOptions: { key: 'key', cert: 'cert' } }
    })

    describe('construction', function() {
        it('extends CommonConfig', function() {
            var config = new HttpsConfig(defaultOptions)
            expect(config).to.be.an.instanceof(CommonConfigStub)
        })

        it('constructor calls CommonConfig constructor', function() {
            new HttpsConfig(defaultOptions)
            expect(CommonConfigStub.calledOnce).to.be.true
            expect(CommonConfigStub.firstCall.args[0]).to.deep.equal(defaultOptions)
        })

        it('sets a default port', function() {
            var config = new HttpsConfig(defaultOptions)

            expect(config.port).to.be.equal(HttpsConfig._DEFAULT.port)
        })

        it('sets the type', function() {
            var config = new HttpsConfig(defaultOptions)

            expect(config.type).to.be.equal(serverTypes.HTTPS)
        })

        it('persists options when provided', function() {
            var options = { httpsOptions: { key: 'test'
                                          , cert: 'cert'
                                          }
                          }
            var config = new HttpsConfig(options)

            return expect(config.httpsOptions).to.eventually.deep.equal(options.httpsOptions)
        })

        it('builds a default set of https options', function() {
            var config = new HttpsConfig()

            this.timeout(5000)
            return expect(config.httpsOptions).to.eventually.be.fulfilled
                .and.to.exist
                .and.to.include.keys('cert', 'key')
        })
    })
});