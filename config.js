require('dotenv').config()

module.exports = {
  'development': {
    dbConnectionString: 'postgres://localhost:5432/mailbox',
    popPort: 5001,
    popHost: '127.0.0.1'
  },
  'test': {
    dbConnectionString: 'postgres://localhost:5432/testmailbox',
    popPort: 5001,
    popHost: '127.0.0.1'
  },
  'production': {
    dbConnectionString: process.env.PGPROD,
    popPort: 5001,
    popHost: '192.168.48.55'
  }
}
