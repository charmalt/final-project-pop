'use strict'
const env = process.env.ENV || 'development'
const config = require('../config')[env]
const TCPServer = require('../lib/tcpServer')
const HandshakeFactory = require('./popClientHandshake').HandshakeFactory
const TcpConnectedClientFactory = require('./tcpConnectedClient').TCPConnectedClientFactory
const POPDbInterface = require('../models/popDBInterface')
const DBConnection = require('../models/dbConnection')

class PopServer {
  constructor (options) {
    let args = Object.assign({}, { port: config.popPort, host: config.popHost, client: config.dbConnectionString }, options)
    this.port = args['port']
    this.address = args['host']
    this.dbConnection = new DBConnection(args['client'])
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
