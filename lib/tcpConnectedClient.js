'use strict'

class TCPConnectedClient {
  constructor (socket, handshake) {
    this.socket = socket
    this.address = this.socket.remoteAddress
    this.port = this.socket.remotePort
    this.name = `${this.address}:${this.port}`
    this.handshake = handshake
    this.QUIT_CODE = this.handshake.responses['quit']
  }

  receiveMessage (message) {
    this.socket.write(message)
  }

  parseMessage (message) {
    this.handshake.parseMessage(message).then((res) => {
      this.handleResponse(res)
    })
  }

  closeConnection () {
    this.socket.destroy()
  }

  handleResponse (response) {
    this.receiveMessage(JSON.stringify(response))
    if (response === this.QUIT_CODE) this.closeConnection()
  }
}

module.exports.TCPConnectedClient = TCPConnectedClient

class TCPConnectedClientFactory {
  static build (socket, handshake) {
    return new TCPConnectedClient(socket, handshake)
  }
}

module.exports.TCPConnectedClientFactory = TCPConnectedClientFactory
