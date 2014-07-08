module.exports = corsSupport

function corsSupport() {
    return function corsSupport(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*')
        next()
    }
}
