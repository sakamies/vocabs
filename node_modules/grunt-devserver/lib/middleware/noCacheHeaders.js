module.exports = noCacheHeaders

function noCacheHeaders(cacheMethod) {
    if(!cacheMethod)
        throw new Error('invalid cache method')

    return function noCacheHeaders(req, res, next) {
        res.setHeader('Cache-Control', cacheMethod)
        next()
    }
}
