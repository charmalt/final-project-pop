const pg = require('pg')
// const env = require('./config')
const connectionString = 'postgres://localhost:5432/testmailbox'

class Database {
  constructor() {
    this.data = null

  }
  pull () {
    const client = new pg.Client(connectionString)
    client.connect()
    const query = client.query(
      `select * from mail`, (err , res) => {
        this.data = res.rows
      }.bind(this))
    query.on('end', () => { client.end() })
  }
}

module.exports = Database
