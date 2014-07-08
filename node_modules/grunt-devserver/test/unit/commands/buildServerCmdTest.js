var SandboxedModule = require('sandboxed-module')
var HttpConfig = require('../../../lib/model/config/HttpConfig.js')
var HttpsConfig = require('../../../lib/model/config/HttpsConfig.js')
var Q = require('q')

describe('buildServerCmdTest', function() {
    var httpsOptions = { httpsOptions: { key: 'key', cert: 'cert' } }
    var buildServerCmd, createMiddlewareCmdStub, httpStub, httpsStub

    beforeEach(function() {
        var unitUnderTestPath = '../../../lib/commands/buildServerCmd.js'
        var requires = { './createMiddlewareCmd.js' : createMiddlewareCmdStub = sinon.stub()
                       , 'https': { createServer: httpsStub = sinon.stub() }
                       , 'http': { createServer: httpStub = sinon.stub() }
                       }

        buildServerCmd = SandboxedModule.require(unitUnderTestPath, { requires: requires })
    })

    it('rejects when missing a config', function() {
        return expect(buildServerCmd()).to.be.rejected
    })

    it('rejects when missing a server type', function() {
        return expect(buildServerCmd({})).to.be.rejected
    })

    it('rejects if createMiddlewareCmd throws', function() {
        var config = new HttpConfig()

        createMiddlewareCmdStub.throws()
        return expect(buildServerCmd(config)).to.be.rejected
    })

    it('rejects if the server type is unrecognized', function() {
        var config = new HttpConfig()

        config.type = 'nothing'
        return expect(buildServerCmd(config)).to.be.rejected
    })

    function assertServer(server, config, expectedApp, expectedServer) {
        expect(server).to.be.defined
        expect(server.config).to.be.equal(config)
        expect(server.app).to.be.equal(expectedApp)
        expect(server.httpServer).to.be.equal(expectedServer)
    }

    describe('creating a https server', function() {
        it('rejects if httpsOptions is rejected', function() {
            var config = new HttpsConfig(httpsOptions)
            var promise

            config.httpsOptions = Q.reject()
            promise = buildServerCmd(config)
            return promise.fail(function () {
                expect(createMiddlewareCmdStub.called).to.be.true
            })
        })

        it('creates a https server', function() {
            var expectedApp = {}
            var expectedServer = {}
            var config = new HttpsConfig(httpsOptions)

            createMiddlewareCmdStub.returns(expectedApp)
            httpsStub.returns(expectedServer)
            return buildServerCmd(config).then(function (server) {
                assertServer(server, config, expectedApp, expectedServer);
            })
        })
    })

    describe('creating a http server', function() {
        it('creates a http server', function() {
            var expectedApp = {}
            var expectedServer = {}
            var config = new HttpConfig()

            createMiddlewareCmdStub.returns(expectedApp)
            httpStub.returns(expectedServer)
            return buildServerCmd(config).then(function (server) {
                assertServer(server, config, expectedApp, expectedServer);
            })
        })
    })
})