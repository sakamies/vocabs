var express = require('express')
  , Route = require('../model/middleware/Route')
  , util = require('util')

/**
 * Given a server configuration create an express application server
 * and register the appropriate middleware
 *
 * @param {(HttpConfig|HttpsConfig)} config
 * @returns {function} a http/https middleware listener
 */
function createExpressMiddlewareCmd(config) {
    if(!config)
        throw new Error('a server configuration is required')
    if(!config.middleware)
        throw new Error('a middleware configuration is required')

    return createExpressMiddleware(config)
}

function createExpressMiddleware(config) {
    var app = express()
    if(typeof(config.middleware) === 'function')
        addMiddlewareList(app, config.middleware())
    else if(util.isArray(config.middleware))
        addMiddlewareList(app, config.middleware)
    else
        throw new Error('unrecoginized middleware')
    return app;
}

function addMiddlewareList(app, middleware) {
    middleware.forEach(function(item, index) {
        if(Route.isRoute(item))
            addRoute(app, item);
        else if(typeof item === 'function')
            app.use(item);
        else
            throw new Error('invalid middleware configuration at index ' + index)
    })
}

function addRoute(app, routeConfig) {
    var route = app.route(routeConfig.path)
    routeConfig.actions.forEach(function(action) {
        route[action.verb](action.callback)
    })
}

module.exports = createExpressMiddlewareCmd