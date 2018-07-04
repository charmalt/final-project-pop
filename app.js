let POPServer = require('./lib/popServer')
let pg = require('pg')
const config = require('./config')['production']

let dbClient = new pg.Client(config.dbConnectionString)
let serverName = new POPServer({ host: config.popHost, port: config.popPort, client: dbClient })
serverName.start()
