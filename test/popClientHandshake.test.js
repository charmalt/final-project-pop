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
      let response = await popClientHandshake.parseMessage('HELLO')
      expect(response).toEqual(250)
    })
    it('should respond to client request "USER test@test.com" with 250', async () => {
      let response = await popClientHandshake.parseMessage('USER test@test.com')
      expect(response).toEqual(250)
    })
    it('should save user email to variable this.user on client request "USER test@test.com"', async () => {
      await popClientHandshake.parseMessage('USER test@test.com')
      expect(popClientHandshake.user).toEqual('test@test.com')
    })
    it('should respond to client request MessageRequest with messages', async () => {
      await popClientHandshake.parseMessage('USER test@test.com')
      await popClientHandshake.parseMessage('MessageRequest')
      expect(spyDatabase).toHaveBeenNthCalledWith(1, 'test@test.com')
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
