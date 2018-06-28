const PopServer = require('../lib/popServer')
const TCPServer = require('../utility/tcpServer')
jest.mock('../utility/tcpServer')

describe ('Server', () => {

  beforeEach(() => {
  server = new PopServer()
    TCPServer.mockImplementation((port, address, handshake) => {
      mockServer.init(port, address, handshake)
      return mockServer
    })
  })

  describe('default behaviour', () => {
    it('has a port of 1337', () => {
      expect(server.port).toBe(1337)
    })
  })

})
