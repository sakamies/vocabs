var path = require('path')
  , Server = require('../../../lib/controller/Server.js')
  , HttpConfig = require('../../../lib/model/config/HttpConfig.js')

describe('ServerTest', function() {
    var config, httpServer

    beforeEach(function() {
        config = new HttpConfig()
        config.folder = path.resolve(path.join(__dirname, '../assets'))
        httpServer = { listen: sinon.stub()
                     , close: sinon.stub()
                     }
    })

    describe('construction', function() {
        it('is properly constructed', function() {
            var app = function() {}
            var httpserver = {}
            var server = new Server(config, httpserver, app)

            expect(server).to.exist
            expect(server).to.be.an.instanceof(Server)
            expect(server.start).to.exist
            expect(server.stop).to.exist
            expect(server.config).to.exist
            expect(server.app).to.exist
            expect(server.app).to.be.equal(app)
            expect(server.httpServer).to.exist
            expect(server.httpServer).to.be.equal(httpserver)
            expect(server.config).to.deep.equal(config)
        })
    })

    describe('start', function() {
        var server

        beforeEach(function() {
            server = new Server(config, httpServer, {})
        })

        it('starts a server on the configured port', function() {
            var promise = server.start()
            expect(httpServer.listen.calledOnce).to.be.true
            expect(httpServer.listen.firstCall.args[0]).to.be.equal(config.port)
            expect(promise).to.be.a('object')
        })

        it('resolves the promise when listening complete', function() {
            var promise

            httpServer.listen.callsArg(1)
            promise = server.start()
            return expect(promise).to.eventually.equal(server)
        })

        it('rejects the promise when listening throws', function () {
            var error = new Error('test')
            var promise

            httpServer.listen.throws(error)
            promise = server.start()
            return expect(promise).to.be.rejected
        })
    })

    describe('stop', function() {
        var server

        beforeEach(function() {
            server = new Server(config, httpServer, {})
        })

        it('stops a server', function() {
            server.stop()
            expect(httpServer.close.calledOnce).to.be.true
        })
    })
})