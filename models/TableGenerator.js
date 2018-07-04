const pg = require('pg')
const env = process.env.ENV || 'development'
const db = require('../config')[env]['dbConnectionString']

const clientTest = new pg.Client(db)

clientTest.connect()
clientTest.query('CREATE TABLE mail(id SERIAL PRIMARY KEY, mailfrom VARCHAR(60), mailto VARCHAR(60), mailbody VARCHAR(200))', (err, res) => {
  if (err) {
    console.log(err)
  } else {
    clientTest
      .query("INSERT INTO mail (mailfrom, mailto, mailbody) VALUES ('George', 'Charlene', 'HI'), ('John', 'Igor', 'BYE');", (err, response) => {
        if (err) {
          console.log(err)
        }
        clientTest.end()
      })
  }
})
