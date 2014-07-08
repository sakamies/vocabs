var SandboxedModule = require('sandboxed-module')
  , HttpConfig = require('../../../lib/model/config/HttpConfig')
  , path = require('path')
  , Route = require('../../../lib/model/middleware/Route')

describe('createMiddlewareCmdTest', function() {
    var createExpressMiddleware, config, expressConstStub, expressUseStub, expressRouteStub

    beforeEach(function() {
        var unitUnderTestPath = '../../../lib/commands/createMiddlewareCmd.js'
          , requires = { 'express' : mockExpress() }

        createExpressMiddleware = SandboxedModule.require(unitUnderTestPath, { requires: requires })

        config = new HttpConfig()
        config.folder = path.resolve(path.join(__dirname, '../../assets'))
    })

    function mockExpress() {
        var expressMock = { use : expressUseStub = sinon.stub()
                            // we're returning a new Route since our Route behaves similar to express'
                          , route : expressRouteStub = sinon.stub().returns(new Route('/'))
                          }
        expressConstStub = sinon.stub().returns(expressMock)
        return expressConstStub
    }

    it('throws when config is null', function() {
        expect(function() {
            createExpressMiddleware(null)
        }).to.throw(Error)
    })

    it('throws when config is missing middleware', function() {
        expect(function() {
            createExpressMiddleware({})
        }).to.throw(Error)
    })

    it('executes a middleware factory function', function() {
        var middleware = [sinon.stub(), sinon.stub(), sinon.stub()]
          , config = stubMiddlewareFunction(middleware)

        createExpressMiddleware(config)

        expect(config.middleware.called).to.be.true
    })

    function stubMiddlewareFunction(middlewareList) {
        return { middleware: sinon.stub().returns(middlewareList) }
    }

    it('adds middleware from a factory function', function() {
        var middleware = [sinon.stub(), sinon.stub(), sinon.stub()]
          , config = stubMiddlewareFunction(middleware)

        createExpressMiddleware(config)

        assertMiddlewareIsAdded(middleware)
    })

    function assertMiddlewareIsAdded(middleware) {
        for(var i=0; i < middleware.length; i++)
            expect(expressUseStub.getCall(i).args[0]).to.be.equal(middleware[i])
    }

    it('adds middleware from an array', function() {
        var middleware = [sinon.stub(), sinon.stub(), sinon.stub()]
          , config = { middleware: middleware }

        createExpressMiddleware(config)

        assertMiddlewareIsAdded(middleware)
    })

    it('throws with invalid middlware type', function() {
        expect(function() {
            createExpressMiddleware({middleware: {}})
        }).to.throw(Error)
    })

    it('creates an express app', function() {
        var app = createExpressMiddleware(config)

        expect(app).to.be.equal(expressConstStub())
    })

    it('throws for an invalid middleware item', function() {
        config.middleware = 'invalid middleware item'
        expect(function() {
            createExpressMiddleware(config)
        }).to.throw()
    })

    it('adds a route without an action', function() {
        var route = new Route('/')

        config.middleware = [route]
        createExpressMiddleware(config)
        expect(expressRouteStub.calledOnce).to.be.true
    })

    it('adds a route with a single action', function() {
        var route = new Route('/').get(function () {})

        config.middleware = [route]
        createExpressMiddleware(config)
        expect(expressRouteStub.calledOnce).to.be.true
    })

    it('adds a route with multiple actions', function() {
        var route = new Route('/').get(function () {}).all(function() {})
        var stubRoute = { get: sinon.stub()
                        , all: sinon.stub()
                        }

        expressRouteStub.returns(stubRoute)
        config.middleware = [route]
        createExpressMiddleware(config)
        expect(expressRouteStub.calledOnce).to.be.true
        expect(stubRoute.get.calledOnce).to.be.true
        expect(stubRoute.all.calledOnce).to.be.true
    })

    it('adds a mixed list of routes and callback middleware', function() {
        config.middleware = [ new Route('/').get(function() {})
                            , function() {}
                            ]

        createExpressMiddleware(config)
        expect('/').to.be.equal(expressRouteStub.firstCall.args[0])
        expect(config.middleware[1]).to.be.equal(expressUseStub.firstCall.args[0])
    })
})