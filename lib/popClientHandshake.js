class POPClientHandshake {
  constructor (dbInterface) {
    this.dbInterface = dbInterface
    this.responses = {'quit': 331}
  }
  parseMessage (message) {
    if (message === 'Hello') {
      return '250'
    } else if (message === 'MessageRequest') {
      let messages = this.dbInterface.pull().toString()
      return messages
    } else if (message === 'QUIT') {
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
