const DBConnection = require('../../models/dbConnection')
const POPDbInterface = require('../../models/popDBInterface')

describe('Feature - databaseMailRequest', () => {
  let dbConnection, dbInterface

  beforeEach(() => {
    console.log = jest.fn()
  })

  it('requests mail for user from database', async () => {
    dbConnection = new DBConnection()
    dbInterface = new POPDbInterface(dbConnection)
    let messages = await dbInterface.pull('Charlene')
    let firstMailTo = messages[0].mailto
    let firstMailFrom = messages[0].mailfrom
    let firstMailBody = messages[0].mailbody
    expect(firstMailTo).toEqual('Charlene')
    expect(firstMailFrom).toEqual('George')
    expect(firstMailBody).toEqual('HI')
  })

  it('should not get another user\'s email', async () => {
    dbConnection = new DBConnection()
    dbInterface = new POPDbInterface(dbConnection)
    let messages = await dbInterface.pull('Charlene')
    expect(messages.length).toEqual(1)
  })
})
