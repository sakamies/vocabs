var methods = require('methods')
  , Route = require('../../../lib/model/middleware/Route')
  , route = Route

describe('RouteTest', function() {
    describe('construction', function() {
        it('throws when a path is not provided', function() {
            expect(function() {
                new Route()
            }).to.throw()
        })

        it('constructs normally', function() {
            var path = '/'
              , route = new Route(path)

            assertConstruction(route, path)
        })

        it('constructs when called functionally', function() {
            var path = '/'

            assertConstruction(route(path), path)
        })
    })

    describe('.action', function() {
        it('adds to the list of actions', function() {
            var route = new Route('/')
              , callback = sinon.stub()

            route.action('verb', callback)
            expect(route.actions.length).to.be.equal(1)
            expect('verb').to.be.equal(route.actions[0].verb)
            expect(callback).to.be.equal(route.actions[0].callback)
        })
    })

    describe('.all', function() {
        it('adds to the list of actions with all as the verb', function() {
            var route = new Route('/')
              , callback = sinon.stub()

            assertVerbMethod(route, 'all', callback)
        })
    })

    function assertVerbMethod(route, verb, callback) {
        var length = route.actions.length
        var self = route[verb](callback)

        expect(route.actions.length).to.be.equal(length + 1)
        expect(verb).to.be.equal(route.actions[length].verb)
        expect(callback).to.be.equal(route.actions[length].callback)
        // all verb methods should support chaining
        expect(self).to.be.equal(route)
    }

    describe('.isRoute', function() {
        it('is false when item is falsy', function() {
            expect(Route.isRoute(null)).to.be.false
        })

        it('is false when the path parameter is not present', function() {
            var item = { actions: [] }
            expect(Route.isRoute(item)).to.be.false
        })

        it('is false when the path parameter is not a string', function() {
            var item = { path: {}, actions: [] }
            expect(Route.isRoute(item)).to.be.false
        })

        it('is false when actions is not an array', function() {
            var item = { path: '/', actions: {} }
            expect(Route.isRoute(item)).to.be.false
        })

        it('is true', function() {
            var item = { path: '/', actions: [] }
            expect(Route.isRoute(item)).to.be.true
        })
    })

    describe('http methods', function() {
        var callback, route

        beforeEach(function() {
            route = new Route('/')
            callback = sinon.stub()
        })

        methods.forEach(function(verb) {
            it('uses ' + verb + ' as an action verb', function() {
                expect(route[verb]).to.be.defined
                assertVerbMethod(route, verb, callback)
            })
        })
    })

    function assertConstruction(route, path) {
        expect(route.path).to.be.equal(path)
        expect(route.actions).to.be.ok
        expect(route.actions.length).to.be.equal(0)
        expect(route).to.be.an.instanceof(Route)
    }
})