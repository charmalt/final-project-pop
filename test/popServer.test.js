const PopServer = require('../lib/popServer')
const TCPServer = require('../lib/tcpServer')
const HandshakeFactory = require('../lib/popClientHandshake').HandshakeFactory
const TcpConnectedClientFactory = require('../lib/tcpConnectedClient').TCPConnectedClientFactory
const DBConnection = require('../models/dbConnection')
const POPDbInterface = require('../models/popDBInterface')
jest.mock('../lib/tcpServer')
jest.mock('../lib/popClientHandshake')
jest.mock('../models/dbConnection')
jest.mock('../models/popDBInterface')
jest.mock('../lib/tcpConnectedClient')

describe('Server', () => {
  let server, serverInitSpy, serverStartSpy, serverCloseSpy, interfaceSpy
  const mockServer = {
    init: jest.fn(),
    start: jest.fn(),
    close: jest.fn()
  }
  const mockDB = {}
  const mockInterface = { init: jest.fn() }

  beforeEach(() => {
    DBConnection.mockImplementation(() => { return mockDB })
    POPDbInterface.mockImplementation((db) => {
      mockInterface.init(db)
      return mockInterface
    })
    TCPServer.mockImplementation((port, address, handshake, client, dbInterface) => {
      mockServer.init(port, address, handshake, client, dbInterface)
      return mockServer
    })
    serverInitSpy = jest.spyOn(mockServer, 'init')
    serverStartSpy = jest.spyOn(mockServer, 'start')
    serverCloseSpy = jest.spyOn(mockServer, 'close')
    interfaceSpy = jest.spyOn(mockInterface, 'init')
    server = new PopServer()
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

    it('initialises the TCP server correctly', () => {
      expect(serverInitSpy).toHaveBeenCalledWith(server.port, server.address, HandshakeFactory, TcpConnectedClientFactory, mockInterface)
      expect(interfaceSpy).toHaveBeenCalledWith(mockDB)
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
