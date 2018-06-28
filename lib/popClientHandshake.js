const Database = require('../models/database')
class popClientHandshake {
  constructor (database = new Database()) {
    this.messages = ''
    this.database = database
  }
  parseMessage (message) {
    if (message === 'Hello') {
      return '250'
    } else {
      this.database.getMessages()
      return this.messages
    }
  }
}

module.exports = popClientHandshake
