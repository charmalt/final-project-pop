'use strict'

const net = require('net')

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
    this.maxClientCheck()
    let client = this.TCPConnectedClientFactory.build(socket, this.HandshakeFactory.build(this.dbInterface))
    this.clients.push(client)
    console.log(`${client.name} connected`)
    return client
  }

  maxClientCheck () {
    if (this.clients.length >= 10) {
      let oldClient = this.clients.shift()
      oldClient.closeConnection()
    }
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
    let dataString = data.toString().trim()
    console.log(dataString)
    client.parseMessage(dataString)
  }
}

module.exports = TCPServer
