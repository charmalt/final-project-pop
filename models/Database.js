const pg = require('pg')
const env = require('./config')
// const connectionString = 'postgres://localhost:5432/testmailbox'

class Database {
  constructor() {
    this.data = null

  }
  pull () {
    const client = new pg.Client(env['test'])
    client.connect()
    const query = client.query(
      `select * from mail`, (err , res) => {
        console.log(res.rows)
      })
    query.on('end', () => { client.end() })
  }
}

module.exports = Database
