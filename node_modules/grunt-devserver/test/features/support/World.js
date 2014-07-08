var request = require('supertest')
  , Tempdir = require('temporary/lib/dir')
  , fs = require('fs')
  , path = require('path')

World.prototype.getClient = getClient
World.prototype.createConfigurationFile = createConfigurationFile
World.prototype.getTempDir = getTempDir
World.prototype.stopAllServers = stopAllServers

module.exports = World

function World(callback) {
    this.interface = undefined
    callback()
}

function getClient(serverNum) {
    var servers = this.interface.servers
      , port, protocol
    serverNum = serverNum || 0
    port = servers[serverNum].config.port
    protocol = servers[serverNum].config.type
    return request(protocol + '://localhost:' + port)
}

function getTempDir() {
    if(!this.tempdir)
        this.tempdir = new Tempdir()
    return this.tempdir.path
}

function createConfigurationFile(name, contents) {
    var fullpath = path.join(this.getTempDir(), name)

    fs.writeFileSync(fullpath, contents)
    return { name: name
           , path: fullpath
           }
}

function stopAllServers() {
    if(this.interface && this.interface.servers)
        this.interface.servers.forEach(function(server) { server.stop() })
}