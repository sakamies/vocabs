var methods = require('methods')
  , util = require('util')

module.exports = Route

function Route(path) {
    if(!(this instanceof Route))
        return new Route(path);

    if(!path)
        throw new Error('a path is required')
    this.path = path
    this.actions = []
}

Route.isRoute = isRoute
Route.prototype.action = action
Route.prototype.all = all

methods.forEach(function(method) {
    Route.prototype[method] = function(callback) {
        return this.action(method, callback)
    }
})

function action(method, callback) {
    var definition = { verb: method
                     , callback: callback
                     }
    this.actions.push(definition)
    return this;
}

function all(callback) {
    return this.action('all', callback)
}

function isRoute(item) {
    return !!(item &&
              typeof item.path === 'string' &&
              util.isArray(item.actions))
}