'use strict'
const TCPServer = require('../utility/tcpServer')
const Handshake = require('./popClientHandshake')

class PopServer {
  constructor (port, address) {
    this.port = port || 1337
    this.address = address || '127.0.0.1'
    this.server = new TCPServer(this.port, this.address, Handshake)
  }

}

module.exports = PopServer
