const POPClientHandshake = require('../lib/popClientHandshake').POPClientHandshake
const HandshakeFactory = require('../lib/popClientHandshake').HandshakeFactory

describe('popClientHandshake', () => {
  let popClientHandshake
  let mockDatabaseInterface, spyDatabase
  mockDatabaseInterface = {
    pull: jest.fn()
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
      expect(popClientHandshake.parseMessage('MessageRequest')).toEqual('')
    })
  })

  describe('getting messages', () => {
    it('should query database for message', () => {
      expect(spyDatabase).toHaveBeenCalledTimes(1)
    })
  })
})
