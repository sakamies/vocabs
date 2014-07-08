var SandboxedModule = require('sandboxed-module')
  , Q = require('q')
  , BasicOptions = require('../../../lib/model/BasicOptions.js')

describe('devserverTest', function() {
    var devserver, gruntStub, startServerCmdSpy, loadCompleteStub

    beforeEach(function() {
        gruntStub = createGruntStub()
        mockDependenciesForUnitUnderTest()
    })

    function mockDependenciesForUnitUnderTest() {
        var options = { requires : { '../lib/commands/startServerCmd.js' : createStartServerCmdSpy()
                                   , '../lib/commands/loadCompleteOptionsCmd.js' : createLoadCompleteStub()
                                   }
                      }
        devserver = SandboxedModule.require('../../../tasks/devserver', options)
    }

    function createStartServerCmdSpy() {
        var deferred = Q.defer()
        startServerCmdSpy = sinon.stub().returns(deferred.promise)
        startServerCmdSpy.deferred = deferred
        deferred.resolve()
        return startServerCmdSpy
    }

    function createLoadCompleteStub() {
        var options = new BasicOptions()
        loadCompleteStub = sinon.stub().returns(options)
        return loadCompleteStub
    }

    function createGruntStub() {
        return { registerMultiTask : sinon.stub() }
    }

    describe('grunt plugin', function() {
        it('registers a devserver grunt task', function() {
            devserver(gruntStub)
            expect(gruntStub.registerMultiTask.calledOnce).to.be.true
            expect(gruntStub.registerMultiTask.firstCall.args[0]).to.be.equal('devserver')
        })
    })

    describe('devServerTask', function() {
        var devserverTask, taskContext, doneStub

        describe('handles options correctly', function() {
            beforeEach(function() {
                sinon.spy(BasicOptions.prototype, 'getOptions')
            })

            afterEach(function() {
                BasicOptions.prototype.getOptions.restore()
            })

            it('passes the target name to getOptions', function() {
                var expected = 'expected'
                callDevServerTaskWithOptions(createTaskContext({}, expected))

                expect(loadCompleteStub().getOptions).to.be.equal(BasicOptions.prototype.getOptions)
                expect(BasicOptions.prototype.getOptions.firstCall.args[0]).to.be.equal(expected)
            })
        })

        describe('starts the server', function() {
            it('starts the server with options', function() {
                var expected = { port: 99 }
                callDevServerTaskWithOptions(createTaskContext(expected))

                expect(startServerCmdSpy.lastCall.args[0]).to.deep.equal(expected)
            })
        })

        describe('async', function() {
            var PARAM_ASYNC = [ [{}]
                              , [{ async: true }]
                              , [{ async: 'garbage'}]
                              ]
              , NAMES_ASYNC = ['undefined', 'true', 'garbage']

            PARAM_ASYNC.forEach(function(value, index) {
                var options = value[0]

                it('does not call done when async is ' + NAMES_ASYNC[index], function(done) {
                    var promise = callDevServerTaskWithOptions(createTaskContext(options))

                    promise.then(function () {
                        expect(doneStub.called).to.be.false
                        done()
                    })
                })
            })

            it('calls done when async is false', function(done) {
                var context = createTaskContext({ async: false })
                var promise = callDevServerTaskWithOptions(context)

                promise.then(function() {
                    expect(context.async().called).to.be.true
                    done()
                })

            })
        })

        function callDevServerTaskWithOptions(context) {
            taskContext = context
            devserver(gruntStub)
            devserverTask = gruntStub.registerMultiTask.firstCall.args[2]
            return devserverTask.call(taskContext)
        }

        function createTaskContext(opts, target) {
            var gruntOptions = sinon.stub()
              , options = loadCompleteStub()
            options.options = opts
            doneStub = sinon.stub()
            doneStub.opts = opts
            gruntOptions.returns(opts || {})
            return { options : gruntOptions
                   , async : sinon.stub().returns(doneStub)
                   , target : target
                   }
        }
    })
})