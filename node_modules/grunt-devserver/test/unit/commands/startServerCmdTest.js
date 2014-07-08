var SandboxedModule = require('sandboxed-module')
var Q = require('q')

describe('startServerCmdTest', function() {
    var startServerCmd, buildServerStub, buildServerDefer, serverStub, serverStartDefer

    beforeEach(function() {
        var requires

        serverStartDefer = Q.defer()
        serverStub = { start: sinon.stub().returns(serverStartDefer.promise) }
        buildServerDefer = Q.defer()
        buildServerStub = sinon.stub().returns(buildServerDefer.promise)
        requires =  { './buildServerCmd': buildServerStub
                    }

        startServerCmd = SandboxedModule.require('../../../lib/commands/startServerCmd', { requires: requires })
    })

    it('creates a new http server when no options are passed', function() {
        return assertServerCreated('http')
    })

    function assertServerCreated(type, options) {
        var promise = startServerCmd(options)

        buildServerDefer.resolve(serverStub)
        serverStartDefer.resolve(serverStub)

        return promise.then(function () {
            expect(buildServerStub.calledOnce).to.be.true
            expect(serverStub.start.calledOnce).to.be.true
            expect(buildServerStub.firstCall.args[0].type).to.be.equal(type)
        })
    }

    it('creates a new http server', function() {
        var options = { type: 'http' }
        return assertServerCreated(options.type, options)
    })

    it('creates a new https server', function() {
        var options = { type: 'https'
                      , httpsOptions: { key: 'key'
                                      , cert: 'cert'
                                      }
                      }

        return assertServerCreated(options.type, options)
    })

    it('rejects when buildServer promise rejects', function() {
        var promise = startServerCmd()

        buildServerDefer.reject()

        return expect(promise).be.rejected
    })

    it('rejects when server.start() promise rejects', function() {
        var promise = startServerCmd()

        buildServerDefer.resolve(serverStub)
        serverStartDefer.reject()

        return expect(promise).to.be.rejected
    })

    it('rejects when something throws', function() {
        var expectedMessage = 'test'

        buildServerStub.throws(new Error(expectedMessage))

        return expect(startServerCmd()).to.be.rejectedWith(Error, expectedMessage)
    })
})