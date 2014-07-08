var request = require('supertest')
  , path = require('path')
  , createExpressMiddleware = require('../../lib/commands/createMiddlewareCmd.js')
  , HttpConfig = require('../../lib/model/config/HttpConfig.js')
  , CommonConfig = require('../../lib/model/config/CommonConfig.js')

describe('contentServerTest', function() {
    var config

    beforeEach(function() {
        config = new HttpConfig()
        config.folder = path.resolve(path.join(__dirname, '../assets'))
    })

    describe('tests serving real data from a folder', function() {
        var app

        beforeEach(function() {
            app = createExpressMiddleware(config)
        })

        it('serves folders', function(done) {
            request(app)
                .get('/')
                .set('Accept', 'application/json')
                .expect(200, done)
        })

        it('serves static content', function(done) {
            request(app)
                .get('/test.html')
                .expect(200, done)
        })

        it('replies 404 for missing content', function(done) {
            request(app)
                .get('/missing.html')
                .expect(404, done)
        })

        it('adds CORS headers', function(done) {
            request(app)
                .get('/test.html')
                .expect('Access-Control-Allow-Origin', '*')
                .end(done)
        })

        it('adds no-cache headers', function(done) {
            assertExpectedCacheHeaders(app, CommonConfig._DEFAULT.cacheControl, done)
        })

        it('replies 304 for cached content', function(done) {
            var file = '/test.html'

            request(app)
                .get(file)
                .expect(200, onResult)

            function onResult(req, res) {
                var etag = res.headers.etag

                request(app)
                    .get(file)
                    .set('If-None-Match', etag)
                    .expect(304, done)
            }
        })
    })

    describe('custom caching method', function() {
        it('supplies custom cache headers', function(done) {
            config.cacheControl = 'no-store'
            assertExpectedCacheHeaders(createExpressMiddleware(config), config.cacheControl, done)
        })
    })

    function assertExpectedCacheHeaders(app, expected, done) {
        request(app)
            .get('/test.html')
            .expect('Cache-Control', expected)
            .end(done)
    }
})