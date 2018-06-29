'use strict'

const net = require('net')
const TCPConnectedClient = require('../lib/tcpConnectedClient')

class TCPServer {
  constructor (port, address, HandshakeFactory, TCPConnectedClientFactory, dbInterface) {
    this.port = port
    this.address = address
    this.clients = []
    this.HandshakeFactory = HandshakeFactory
    this.dbInterface = dbInterface
    this.TCPConnectedClientFactory = TCPConnectedClientFactory
  }

  start () {
    this.connection = net.createServer((socket) => {
      let client = this.createClient(socket)
      socket.on('data', (data) => {
        this.handleData(client, data)
      })

      socket.on('end', () => {
        this.closeConnection(client)
      })
    })

    this.connection.listen(this.port, this.address)
    console.log('Server started')
  }

  createClient (socket) {
    let client = this.TCPConnectedClientFactory.build(socket, this.HandshakeFactory.build(this.dbInterface))
    this.clients.push(client)
    console.log(`${client.name} connected`)
    return client
  }

  closeConnection (client) {
    console.log(`${client.name} disconnected`)
  }

  close () {
    this.clients.forEach((client) => {
      client.closeConnection()
    })
    this.clients = []
    this.connection.close()
    console.log('Server closed')
  }

  handleData (client, data) {
    let dataString = data.toString()
    console.log(dataString)
    client.parseMessage(dataString)
  }
}

module.exports = TCPServer