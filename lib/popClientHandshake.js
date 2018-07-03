class POPClientHandshake {
  constructor (dbInterface) {
    this.dbInterface = dbInterface
    this.responses = {'quit': 331}
    this.user = null
  }
  async parseMessage (message) {
    if (message === 'HELLO') {
      return 250
    } else if (message.match(/^USER/)) {
      this._saveUserEmail(message)
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

  _saveUserEmail (message) {
    this.user = message.split(' ')[1]
  }
}

module.exports.POPClientHandshake = POPClientHandshake

class HandshakeFactory {
  static build (connection) {
    return new POPClientHandshake(connection)
  }
}

module.exports.HandshakeFactory = HandshakeFactory
