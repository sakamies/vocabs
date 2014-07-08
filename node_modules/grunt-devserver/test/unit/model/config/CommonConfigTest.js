var SandboxedModule = require('sandboxed-module')
  , util = require('util')

describe('CommonConfigTest', function() {
    describe('defaultMiddleware', function() {
        var CommonConfig, morganStub, serveStaticStub, serveIndexStub
          , corsSupportStub, noCacheHeadersStub, pathStub, mockImpl

        beforeEach(function() {
            var unitUnderTestPath = '../../../../lib/model/config/CommonConfig.js'
              , requires = { 'morgan': morganStub = sinon.stub()
                           , 'serve-static': serveStaticStub = sinon.stub()
                           , 'serve-index': serveIndexStub = sinon.stub()
                           , 'path': pathStub = { resolve: sinon.stub() }
                           , '../../middleware/corsSupport': corsSupportStub = sinon.stub()
                           , '../../middleware/noCacheHeaders': noCacheHeadersStub = sinon.stub()
                           }
            mockImpl = { folder: 'folder'
                       , cacheControl : 'cacheControl'
                       }
            CommonConfig = SandboxedModule.require(unitUnderTestPath, { requires: requires })
        })

        describe('constructor', function() {
            it('constructs without options', function() {
                var config = new CommonConfig()
                assertDefaults(config)
            })

            function assertDefaults(config) {
                for(var key in CommonConfig._DEFAULT) {
                    if(CommonConfig._DEFAULT.hasOwnProperty(key)) {
                        var value = CommonConfig._DEFAULT[key]
                        expect(config[key]).to.be.equal(value)
                    }
                }
            }

            it('constructs with empty options', function() {
                var options = { random: Math.random() }
                  , config = new CommonConfig(options)

                assertDefaults(config)
                expect(config.port).to.be.undefined
                expect(config.base).to.be.undefined
                expect(config.options).to.deep.equal(options)
            })

            it('constructs with options', function() {
                var options = { port: 1234
                              , base: 'base'
                              , cache: 'cacheControl'
                              , middleware: ['middleware']
                              }
                  , config = new CommonConfig(options)

                expect(config.port).to.be.equal(options.port)
                expect(config.folder).to.be.equal(options.base)
                expect(config.cacheControl).to.be.equal(options.cache)
                expect(config.middleware).to.be.equal(options.middleware)
            })
        })

        describe('middleware', function() {
            it('creates a list of middleware', function () {
                var middleware = CommonConfig._defaultMiddleware.call(mockImpl)

                expect(util.isArray(middleware)).to.be.true
                expect(middleware.length).to.be.equal(5)
                expect(morganStub.called).to.be.true
                expect(serveStaticStub.called).to.be.true
                expect(serveIndexStub.called).to.be.true
                expect(corsSupportStub.called).to.be.true
                expect(noCacheHeadersStub.called).to.be.true
                expect(noCacheHeadersStub.firstCall.args[0]).to.be.equal(mockImpl.cacheControl)
            })

            it('puts serve-index after serve-static', function() {
                CommonConfig._defaultMiddleware.call(mockImpl)

                expect(serveStaticStub.called).to.be.true
                expect(serveIndexStub.calledAfter(serveStaticStub)).to.be.true
            })
        })


    })
})