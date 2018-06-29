const TCPServer = require('../lib/tcpServer')
jest.mock('net')

describe('Server', () => {
  let net = require('net')
  let server
  let serverPort = 1337
  let clientPort = 5001
  let serverAddress = '127.0.0.1'
  let clientAddress = '127.0.0.0'
  let mockServer = {
    listen: () => {},
    close: () => {}
  }
  let mockSpy
  let serverCloseSpy
  let mockSocket = {
    remoteAddress: clientAddress,
    remotePort: clientPort
  }
  let mockSocket2 = {
    destroy: () => {}
  }
  let mockClient = {
    address: 'clientAddress',
    port: 2000,
    name: 'name',
    socket: mockSocket2,
    closeConnection: jest.fn()
  }
  let mockHandshakeFactory = { build: jest.fn() }
  let mockTCPConnectedClientFactory = { build: jest.fn(() => { return mockClient }) }
  let mockDbInterface = {}
  let handshakeFactorySpy
  let clientCloseSpy

  beforeEach(() => {
    server = new TCPServer(serverPort, serverAddress, mockHandshakeFactory, mockTCPConnectedClientFactory, mockDbInterface)
    mockSpy = jest.spyOn(mockServer, 'listen')
    handshakeFactorySpy = jest.spyOn(mockHandshakeFactory, 'build')
    serverCloseSpy = jest.spyOn(mockServer, 'close')
    clientCloseSpy = jest.spyOn(mockClient, 'closeConnection')
    net.createServer = () => { return mockServer }
    console.log = jest.fn()
    clientCloseSpy.mockClear()
  })

  it('creates an TCP server', () => {
    server.start()
    expect(server.connection).toEqual(mockServer)
  })

  it('defines a port', () => {
    expect(server.port).toBe(serverPort)
  })

  it('defines an address', () => {
    expect(server.address).toBe(serverAddress)
  })

  it('tells the connection to listen on set port and address', () => {
    server.start()
    expect(mockSpy).toHaveBeenCalledWith(serverPort, serverAddress)
  })

  describe('createClient', () => {
    it('logs the new client connection', () => {
      server.createClient(mockSocket)
      expect(console.log.mock.calls[0][0]).toBe(`${mockClient.name} connected`)
    })

    it('returns the Client instance', () => {
      expect(server.createClient(mockSocket)).toBe(mockClient)
    })

    it('stores client in array', () => {
      server.createClient(mockSocket)
      expect(server.clients).toContain(mockClient)
    })

    it('build the new handshake', () => {
      server.createClient(mockSocket)
      expect(handshakeFactorySpy).toHaveBeenCalledWith(mockDbInterface)
    })
  })
  describe('closeConnection', () => {
    it('logs the closed connection', () => {
      server.closeConnection(mockClient)
      expect(console.log.mock.calls[0][0]).toBe(`${mockClient.name} disconnected`)
    })
  })

  describe('closeServer', () => {
    it('closes server connection', () => {
      server.start()
      server.close()
      expect(serverCloseSpy).toHaveBeenCalledTimes(1)
    })

    it('Logs the closed connection', () => {
      server.start()
      server.close()
      expect(console.log.mock.calls[1][0]).toBe('Server closed')
    })

    it('destroys socket connection', () => {
      server.start()
      server.createClient(mockSocket)
      server.close()
      expect(clientCloseSpy).toHaveBeenCalledTimes(1)
    })

    it('logs the closed connection', () => {
      server.start()
      server.createClient(mockSocket)
      server.close()
      expect(server.clients).toHaveLength(0)
    })
  })
})
