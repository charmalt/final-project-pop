let POPServer = require('./lib/popServer')
let pg = require('pg')

const env = require('./config')['production']
console.log(env)
let dbClient = new pg.Client(env.dbConnectionString)
let serverName = new POPServer(env.popHost, env.popPort, dbClient)
serverName.start()
