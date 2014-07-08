var serverTypes = require('./../data/serverTypes.json')
  , underscore = require('underscore')
  , CommonConfig = require('./CommonConfig')
  , pem = require('pem')
  , Q = require('q')

/**
 * Configuration for a HTTPS server
 * @param options
 * @constructor
 */
function HttpsConfig(options) {
    var httpsOptions = options && options.httpsOptions

    underscore.extend(this, HttpsConfig._DEFAULT)
    CommonConfig.call(this, options)
    this.httpsOptions = applyHttpsOptions.call(this, httpsOptions)
    this.type = serverTypes.HTTPS
}


HttpsConfig.prototype = Object.create(CommonConfig.prototype)
HttpsConfig._DEFAULT = { port: 8443 }

function applyHttpsOptions(options) {
    if(options && options.key && options.cert)
        return new Q(options)
    return buildSelfSignedHttpsConfig(options)
}

function buildSelfSignedHttpsConfig(options) {
    var deferred = Q.defer()

    var pemOptions = { days: 7, selfSigned: true }

    console.log('creating self-signing certificates for ssl')
    pem.createCertificate(pemOptions, onCertificateCreated);

    return deferred.promise

    function onCertificateCreated(err, keys) {
        var httpsOptions = options || {}

        if(err)
            deferred.reject(err)
        else {
            httpsOptions.key = keys.serviceKey
            httpsOptions.cert = keys.certificate
            deferred.resolve(httpsOptions)
        }
    }
}


module.exports = HttpsConfig