var noCacheHeaders = require('../../../lib/middleware/noCacheHeaders.js')

describe('noCacheHeadersTest', function() {
    var CACHE_METHOD = 'no-cache'
      , result, next

    beforeEach(function() {
        var handler = noCacheHeaders(CACHE_METHOD)
        result = { setHeader : sinon.spy() }
        next = sinon.spy()

        handler(undefined, result, next)
    })

    it('sets passed cache method on the result', function() {
        expect(result.setHeader.calledOnce).to.be.true
        expect(result.setHeader.firstCall.args[0]).to.be.equal('Cache-Control')
        expect(result.setHeader.firstCall.args[1]).to.be.equal(CACHE_METHOD)
    })

    it('calls next', function() {
        expect(next.calledOnce).to.be.true
    })
})