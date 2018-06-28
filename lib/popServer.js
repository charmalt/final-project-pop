'use strict'
const TCPServer = require('../utility/tcpServer')

class PopServer {
  constructor (port, address) {
    this.port = port || 1337
  }
}

module.exports = PopServer
