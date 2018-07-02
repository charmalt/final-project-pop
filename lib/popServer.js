'use strict'
const TCPServer = require('../lib/tcpServer')
const HandshakeFactory = require('./popClientHandshake').HandshakeFactory
const TcpConnectedClientFactory = require('./tcpConnectedClient').TCPConnectedClientFactory
const POPDbInterface = require('../models/popDBInterface')
const DBConnection = require('../models/dbConnection')

class PopServer {
  constructor (address, port) {
    this.port = port || 5001
    this.address = address || '127.0.0.1'
    this.dbConnection = new DBConnection()
    this.server = new TCPServer(this.port, this.address, HandshakeFactory, TcpConnectedClientFactory, new POPDbInterface(this.dbConnection))
  }

  start () {
    this.server.start()
  }

  close () {
    this.server.close()
  }
}

module.exports = PopServer
