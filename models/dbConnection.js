const Client = require('pg').Client
const env = require('./config')

class DBConnection {
  constructor (dbClient = new Client(env['test'])) {
    this.client = dbClient
    this.client.connect()
    console.log('hi')
  }
}

module.exports = DBConnection
