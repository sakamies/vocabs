var MultiOptions = require('../../../lib/model/MultiOptions.js')

describe('MultiOptionsTest', function() {
    var sample

    beforeEach(function() {
        sample = { options: { port: 80}
                 , https: { port: 443
                          , type: 'https'
                          }
                 , production: { base: '../assets/production' }
                 }
    })

    describe('construction', function() {
        var loadStub

        beforeEach(function() {
            loadStub = sinon.stub(MultiOptions.prototype, '_loadOptionsFile').returns({ options: { port: 80 }})
        })

        afterEach(function() {
            loadStub.restore()
        })

        it('loads multioptions file', function() {
            var unit = new MultiOptions('devserver.json')

            expect(loadStub.calledOnce).to.be.true
            expect(unit.multioptions).to.be.equal(loadStub())
        })

        it('constructs without parameters', function() {
            var unit = new MultiOptions()

            expect(unit.multioptions).to.deep.equal({})
        })

        it('constructs with options', function() {
            var unit = new MultiOptions(sample)

            expect(unit.multioptions).to.deep.equal(sample)
        })
    })

    describe('getOptions', function() {
        it('returns base options when name is undefined', function() {
            var unit = new MultiOptions(sample)
              , expected = sample.options

            expect(unit.getOptions()).to.deep.equal(expected)
        })

        it('combines a specific configuration with base options', function() {
            var unit = new MultiOptions(sample)
              , expected = { port: 80
                           , base: sample.production.base
                           }

            expect(unit.getOptions('production')).to.deep.equal(expected)
        })

        it('named configuration options override base options', function() {
            var unit = new MultiOptions(sample)
              , expected = sample.https

            expect(unit.getOptions('https')).to.deep.equal(expected)
        })
    })

    describe('getConfigurationNames', function() {
        it('returns an empty array when no configurations are present', function() {
            var unit = new MultiOptions()

            expect(unit.getConfigurationNames().length).to.be.equal(0)
        })

        it('returns an empty array when only options are present', function() {
            var options = { options: { port: 80} }
              , unit = new MultiOptions(options)

            expect(unit.getConfigurationNames().length).to.be.equal(0)
        })

        it('returns a single configuration', function() {
            var options = { options: { port: 8080 }
                          , production: { port: 80 }
                          }
              , unit = new MultiOptions(options)
              , expected = ['production']

            expect(unit.getConfigurationNames()).to.deep.equal(expected)
        })

        it('returns multiple configurations', function() {
            var unit = new MultiOptions(sample)
              , expected = ['https', 'production']

            expect(unit.getConfigurationNames()).to.deep.equal(expected)
        })
    })

    describe('hasConfiguration', function() {
        it('returns false when configuration does not exist', function() {
            var unit = new MultiOptions(sample)

            expect(unit.hasConfiguration('not a configuration')).to.be.false
        })

        it('returns true when configuration exists', function() {
            var unit = new MultiOptions(sample)

            expect(unit.hasConfiguration('production')).to.be.true
        })

        it('returns false when testing for options', function() {
            var unit = new MultiOptions(sample)

            expect(unit.hasConfiguration('options')).to.be.false
        })
    })
})