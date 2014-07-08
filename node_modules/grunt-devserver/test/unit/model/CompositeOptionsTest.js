var CompositeOptions = require('../../../lib/model/CompositeOptions.js')
  , BasicOptions = require('../../../lib/model/BasicOptions.js')
  , MultiOptions = require('../../../lib/model/MultiOptions.js')

describe('CompositeOptionsTest', function() {
    var basic, multi

    beforeEach(function() {
        basic = new BasicOptions({ port: 80 })
        multi = new MultiOptions({ options: { type: 'https', port: 4443 }
                                 , production: { port: 443 }
                                })
    })

    describe('construction', function() {
        it('throws when optionsList is not an array', function() {
            expect(function() {
                new CompositeOptions('lol!')
            }).to.throw()
        })

        it('constructs without parameters', function() {
            var unit = new CompositeOptions()

            expect(unit.optionsList.length).to.be.equal(0)
        })

        it('constructs with an optionsList', function() {
            var expected = [multi, basic]
              , unit = new CompositeOptions(expected)

            expect(unit.optionsList).to.deep.equal(expected)
        })
    })

    describe('hasConfiguration', function() {
        it('returns true when the configuration exists', function() {
            var unit = new CompositeOptions([basic, multi])

            expect(unit.hasConfiguration('production')).to.be.true
        })

        it('returns false when the configuration does not exist', function() {
            var unit = new CompositeOptions([basic, multi])

            expect(unit.hasConfiguration('unknown configuration')).to.be.false
        })
    })

    describe('getOptions', function() {
        it('mixes in all options with the last in the array taking precedents', function() {
            var unit = new CompositeOptions([multi, basic])
              , expected = { port: 80, type: 'https' }

            expect(unit.getOptions('production')).to.deep.equal(expected)
        })
    })

    describe('getConfigurationNames', function() {
        it('returns an empty array when no options are present', function() {
            var unit = new CompositeOptions()

            expect(unit.getConfigurationNames().length).to.be.equal(0)
        })

        it('returns a list of configuration names', function() {
            var unit = new CompositeOptions([multi])
              , expected = ['production']

            expect(unit.getConfigurationNames()).to.deep.equal(expected)
        })

        it('returns a deduped list of configuration names', function() {
            var anotherMulti = { options: { port: 99 }, production: {}, proxy: { port: 8000 }}
              , unit = new CompositeOptions([multi, multi, new MultiOptions(anotherMulti)])
              , expected = ['production', 'proxy']

            expect(unit.getConfigurationNames().length).to.be.equal(expected.length)
            expect(unit.getConfigurationNames()).to.deep.equal(expected)
        })
    })
})