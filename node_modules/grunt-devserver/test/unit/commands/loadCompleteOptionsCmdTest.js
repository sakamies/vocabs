var loadCompleteOptions = require('../../../lib/commands/loadCompleteOptionsCmd.js')
  , BasicOptions = require('../../../lib/model/BasicOptions.js')
  , MultiOptions = require('../../../lib/model/MultiOptions.js')
  , CompositeOptions = require('../../../lib/model/CompositeOptions.js')

describe('loadCompleteOptionsCmdTest', function() {
    var loadOptionsFileStub

    beforeEach(function() {
        loadOptionsFileStub = sinon.stub(MultiOptions.prototype, '_loadOptionsFile')
    })

    afterEach(function() {
        loadOptionsFileStub.restore()
    })

    it('throws when options is falsy (null)', function() {
        expect(function() {
            loadCompleteOptions()
        }).to.throw()
    })

    it('throws when options is not an object', function() {
        expect(function() {
            loadCompleteOptions('not an object')
        }).to.throw()
    })

    it('return BasicOptions when options is an object literal', function() {
        var options = { port: 80 }
          , actual = loadCompleteOptions(options)

        expect(actual).to.be.an.instanceof(BasicOptions)
        expect(actual.getOptions()).to.deep.equal(options)
    })

    it('returns BasicOptions when options is a *Options duck-type', function() {
        var options = new BasicOptions()

        expect(loadCompleteOptions(options)).to.be.equal(options)
    })

    describe('options composites', function() {
        beforeEach(function() {
            loadOptionsFileStub.returns({ options: { type: 'https' }
                                        , production: { port: 443 }
                                       })
        })

        it('returns a composite when a file property is present', function() {
            var options = { file: './servers.json' }
              , actual = loadCompleteOptions(options)

            expect(actual).to.be.an.instanceof(CompositeOptions)
            expect(['production']).to.deep.equal(actual.getConfigurationNames())
        })
    })
})