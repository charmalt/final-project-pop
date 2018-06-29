class POPClientHandshake {
  constructor (dbInterface) {
    this.messages = ''
    this.dbInterface = dbInterface
  }
  parseMessage (message) {
    if (message === 'Hello') {
      return '250'
    } else {
      this.dbInterface.pull()
      return this.messages
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
