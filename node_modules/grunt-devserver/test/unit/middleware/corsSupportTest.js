var corsSupport = require('../../../lib/middleware/corsSupport.js')

describe('corsSupportTest', function() {
    var result, next

    beforeEach(function() {
        var handler = corsSupport()
        result = { setHeader : sinon.spy() }
        next = sinon.spy()

        handler(undefined, result, next)
    })

    it('sets a CORS header on the result', function() {
        expect(result.setHeader.calledOnce).to.be.true
        expect(result.setHeader.firstCall.args[0]).to.be.equal('Access-Control-Allow-Origin')
        expect(result.setHeader.firstCall.args[1]).to.be.equal('*')
    })

    it('calls next', function() {
        expect(next.calledOnce).to.be.true
    })
})