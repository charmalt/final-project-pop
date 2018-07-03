class POPClientHandshake {
  constructor (dbInterface) {
    this.dbInterface = dbInterface
    this.responses = {'quit': 331}
  }
  async parseMessage (message) {
    if (message === 'Hello') {
      return 250
    } else if (message.match(/^USER/)) {
      return 250
    } else if (message === 'MessageRequest') {
      let messages = await this.dbInterface.pull()
      return messages
    } else if (message === 'QUIT') {
      return 331
    } else {
      return 501
    }
  }
}

module.exports.POPClientHandshake = POPClientHandshake

class HandshakeFactory {
  static build (connection) {
    return new POPClientHandshake(connection)
  }
}

module.exports.HandshakeFactory = HandshakeFactory
