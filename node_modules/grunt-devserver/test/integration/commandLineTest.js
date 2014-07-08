var http = require('http')
  , Q = require('q')

describe('create a server from the command line', function() {
    var httpStub

    beforeEach(function() {
        httpStub = sinon.stub(http, 'createServer')
    })

    it('starts a server when no arguments are supplied', function() {
        var deferred = Q.defer()
          , promise = deferred.promise

        httpStub.returns({ listen: deferred.resolve })
        require('../../bin/devserver')

        return expect(promise).to.be.fulfilled
    })

    afterEach(function() {
        httpStub.restore()
    })
})