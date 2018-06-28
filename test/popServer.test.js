const PopServer = require('../lib/popServer')
const TCPServer = require('../utility/tcpServer')
const Handshake = require('../lib/popClientHandshake')
jest.mock('../utility/tcpServer')

describe('Server', () => {
  let server, serverInitSpy, serverStartSpy, serverCloseSpy
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
    serverStartSpy = jest.spyOn(mockServer, 'start')
    serverCloseSpy = jest.spyOn(mockServer, 'close')
  })

  describe('default behaviour', () => {
    it('has a port of 5001', () => {
      expect(server.port).toBe(5001)
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

  describe('starts tcpServer', () => {
    it('calls start method on tcpServer', () => {
      server.start()
      expect(serverStartSpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('close', () => {
    it('calls close method on tcpServer', () => {
      server.close()
      expect(serverCloseSpy).toHaveBeenCalledTimes(1)
    })
  })
})
