const { exec } = require('child_process')
const DBConnection = require('../../models/dbConnection')
const POPDbInterface = require('../../models/POPDbInterface')

describe('Feature - databaseMailRequest', () => {
  let dbConnection, dbInterface

  it('requests mail from database', async () => {
    await exec('psql -c \'\\c testmailbox\' -c \'TRUNCATE TABLE mail;\'')
    await exec('psql -c \'\\c testmailbox\' -c "INSERT INTO mail (mailfrom, mailto, mailbody) VALUES (\'george\', \'charlene\', \'HI\');"')
    dbConnection = new DBConnection()
    dbInterface = new POPDbInterface(dbConnection)
    let messages = await dbInterface.pull()
    // console.log(messages)
    let mailto = messages[0].mailto
    let mailfrom = messages[0].mailfrom
    let mailbody = messages[0].mailbody
    expect(mailto).toEqual('charlene')
    expect(mailfrom).toEqual('george')
    expect(mailbody).toEqual('HI')
  })
})
