'use strict'
const TCPServer = require('../lib/tcpServer')
const Handshake = require('./popClientHandshake')

class PopServer {
  constructor (port, address) {
    this.port = port || 5001
    this.address = address || '127.0.0.1'
    this.server = new TCPServer(this.port, this.address, Handshake)
  }

  start () {
    this.server.start()
  }

  close () {
    this.server.close()
  }
}

module.exports = PopServer
