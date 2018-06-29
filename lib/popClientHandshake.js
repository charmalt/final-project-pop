class POPClientHandshake {
  constructor (dbInterface) {
    this.dbInterface = dbInterface
  }
  parseMessage (message) {
    if (message === 'Hello') {
      return '250'
    } else if (message === 'MessageRequest') {
      return this.dbInterface.pull()
    } else if (message === 'Quit') {
      return '331'
    } else {
      return '501'
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
