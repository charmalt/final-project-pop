const DBConnection = require('../../models/dbConnection')
const POPDbInterface = require('../../models/popDBInterface')

describe('Feature - databaseMailRequest', () => {
  let dbConnection, dbInterface

  it('requests mail from database', async () => {
    dbConnection = new DBConnection()
    dbInterface = new POPDbInterface(dbConnection)
    let messages = await dbInterface.pull()
    let firstMailTo = messages[0].mailto
    let firstMailFrom = messages[0].mailfrom
    let firstMailBody = messages[0].mailbody
    expect(firstMailTo).toEqual('Charlene')
    expect(firstMailFrom).toEqual('George')
    expect(firstMailBody).toEqual('HI')
    let secondMailTo = messages[1].mailto
    let secondMailFrom = messages[1].mailfrom
    let secondMailBody = messages[1].mailbody
    expect(secondMailTo).toEqual('Igor')
    expect(secondMailFrom).toEqual('John')
    expect(secondMailBody).toEqual('BYE')
  })
})
