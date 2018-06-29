const POPClientHandshake = require('../lib/popClientHandshake').POPClientHandshake
const HandshakeFactory = require('../lib/popClientHandshake').HandshakeFactory

describe('popClientHandshake', () => {
  let popClientHandshake
  let mockDatabaseInterface, spyDatabase
  mockDatabaseInterface = {
    pull: jest.fn(() => { return 'test' })
  }

  beforeEach(() => {
    popClientHandshake = new POPClientHandshake(mockDatabaseInterface)
    spyDatabase = jest.spyOn(mockDatabaseInterface, 'pull')
  })

  describe('HandshakeFactory', () => {
    it('creates new handshake', () => {
      expect(HandshakeFactory.build(mockDatabaseInterface)).toBeInstanceOf(POPClientHandshake)
    })

    it('passes on right arguments to constructor', () => {
      let handshake = HandshakeFactory.build(mockDatabaseInterface)
      expect(handshake.dbInterface).toBe(mockDatabaseInterface)
    })
  })

  describe('return messages', () => {
    it('should respond to client request Hello with 250', () => {
      expect(popClientHandshake.parseMessage('Hello')).toEqual('250')
    })
    it('should respond to client request MessageRequest with messages', () => {
      popClientHandshake.parseMessage('MessageRequest')
      expect(spyDatabase).toHaveBeenCalledTimes(1)
    })
    it('should return message from database', () => {
      expect(popClientHandshake.parseMessage('MessageRequest')).toEqual('test')
    })
    it('should respond to client request Quit with 331', () => {
      expect(popClientHandshake.parseMessage('Quit')).toEqual('331')
    })
    it('should respond to any other request with 501', () => {
      expect(popClientHandshake.parseMessage('Quitsss')).toEqual('501')
    })
  })
})
