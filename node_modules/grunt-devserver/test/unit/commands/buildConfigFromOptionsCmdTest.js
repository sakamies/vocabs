var buildConfigFromOptions = require('../../../lib/commands/buildConfigFromOptionsCmd')

describe('buildConfigFromOptionsCmdTest', function() {
    it('returns HttpConfig when options is missing', function() {
        var config = buildConfigFromOptions()

        assertHttpConfig(config)
    })

    function assertHttpConfig(config) {
        expect(config).to.be.defined
        expect(config.type).to.be.equal('http')
    }

    it('returns HttpConfig when options type is missing', function() {
        var config = buildConfigFromOptions({})

        assertHttpConfig(config)
    })

    it('returns HttpConfig when options type is http', function() {
        var config = buildConfigFromOptions({ type: 'http' })

        assertHttpConfig(config)
    })

    function assertHttpsConfig(config) {
        expect(config).to.be.defined
        expect(config.type).to.be.equal('https')
    }

    it('returns HttpsConfig when options type is https', function() {
        var config = buildConfigFromOptions({ type: 'https' })

        assertHttpsConfig(config)
    })

    it('throws when options type is unrecoginized', function() {
        expect(function() {
            buildConfigFromOptions({ type: 'pizzaparty' })
        }).to.throw()
    })
})