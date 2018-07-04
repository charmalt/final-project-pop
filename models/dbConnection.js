const Client = require('pg').Client
const env = process.env.NODE_ENV || 'development'
const db = require('../config')[env].dbConnectionString

class DBConnection {
  constructor (dbClient = new Client(db)) {
    this.client = dbClient
    this.client.connect()
  }
}

module.exports = DBConnection
