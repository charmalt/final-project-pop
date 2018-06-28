const PopServer = require('../lib/popServer')
const TCPServer = require('../utility/tcpServer')
const Handshake = require('../lib/popClientHandshake')
jest.mock('../utility/tcpServer')

describe ('Server', () => {

  let server, serverInitSpy
  let mockServer = {
    init: jest.fn(),
    start: jest.fn(),
    close: jest.fn()
  }

  beforeEach(() => {
  server = new PopServer()
    TCPServer.mockImplementation((port, address, handshake) => {
      mockServer.init(port, address, handshake)
      return mockServer
    })
  serverInitSpy = jest.spyOn(mockServer, 'init')
  })

  describe('default behaviour', () => {
    it('has a port of 1337', () => {
      expect(server.port).toBe(1337)
    })

    it('has a default address of 127.0.0.1', () => {
      expect(server.address).toEqual('127.0.0.1')
    })

    it('creates a TCPServer', () => {
      expect(server.server).toBe(mockServer)
    })

    it('gives the correct port and address to the server', () => {
      expect(serverInitSpy).toHaveBeenCalledWith(server.port, server.address, Handshake)
    })
  })

})
