const Database = require('../models/database')
class popClientHandshake {
  constructor (database = new DatabaseInterface(connection)) {
    this.messages = ''
    this.database = database
  }
  parseMessage (message) {
    if (message === 'Hello') {
      return '250'
    } else {
      this.database.pull()
      return this.messages
    }
  }
}

module.exports = popClientHandshake
