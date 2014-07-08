var middlewareFactory = module.exports = sinon.stub()

middlewareFactory.returns(middleware)

function middleware(req, res, next) {
    var msg = "custom middleware"

    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Length', msg.length);
    res.status(200);
    res.send(msg);
}