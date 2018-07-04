'use strict'
const env = process.env.NODE_ENV || 'development'
const config = require('../config')[env]
const pg = require('pg')
const TCPServer = require('../lib/tcpServer')
const HandshakeFactory = require('./popClientHandshake').HandshakeFactory
const TcpConnectedClientFactory = require('./tcpConnectedClient').TCPConnectedClientFactory
const POPDbInterface = require('../models/popDBInterface')
const DBConnection = require('../models/dbConnection')

class PopServer {
  constructor (options) {
    let defaults = {
      port: config.popPort,
      host: config.popHost,
      client: new pg.Client(config.dbConnectionString)
    }
    let args = Object.assign({}, defaults, options)
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
