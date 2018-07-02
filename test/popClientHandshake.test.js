const HandshakeFactory = require('../lib/popClientHandshake').HandshakeFactory

describe('popClientHandshake', () => {
  let popClientHandshake
  let mockDatabaseInterface, spyDatabase
  mockDatabaseInterface = {
    pull: jest.fn(() => { return new Promise((resolve, reject) => { resolve('test') }) })
  }

  beforeEach(() => {
    popClientHandshake = HandshakeFactory.build(mockDatabaseInterface)
    spyDatabase = jest.spyOn(mockDatabaseInterface, 'pull')
  })

  describe('return messages', () => {
    it('should respond to client request Hello with 250', async () => {
      let response = await popClientHandshake.parseMessage('Hello')
      expect(response).toEqual(250)
    })
    it('should respond to client request MessageRequest with messages', async () => {
      await popClientHandshake.parseMessage('MessageRequest')
      expect(spyDatabase).toHaveBeenCalledTimes(1)
    })
    it('should return message from database', async () => {
      let response = await popClientHandshake.parseMessage('MessageRequest')
      expect(response).toEqual('test')
    })
    it('should respond to client request Quit with 331', async () => {
      let response = await popClientHandshake.parseMessage('QUIT')
      expect(response).toEqual(331)
    })
    it('should respond to other requests with 501', async () => {
      let response = await popClientHandshake.parseMessage('Quitsss')
      expect(response).toEqual(501)
    })
    it('should respond to any other request with 501', async () => {
      let response = await popClientHandshake.parseMessage('Another')
      expect(response).toEqual(501)
    })
  })
})
