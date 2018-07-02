const pg = require('pg')
const env = require('./config')
const connectionString = process.env.DEV_DB || env['development'];

(async () => {
  const client = new pg.Client(connectionString)
  client.connect()
  await client
    .query('CREATE TABLE mail(id SERIAL PRIMARY KEY, mailfrom VARCHAR(60), mailto VARCHAR(60), mailbody VARCHAR(200))', (err, res) => {
      if (err) {
        console.log(err)
      }
      client.end()
    })

  const connectionStringTest = process.env.TEST_DB || env['test']

  const clientTest = new pg.Client(connectionStringTest)
  clientTest.connect()
  await clientTest.query('CREATE TABLE mail(id SERIAL PRIMARY KEY, mailfrom VARCHAR(60), mailto VARCHAR(60), mailbody VARCHAR(200))', (err, res) => {
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
})()
