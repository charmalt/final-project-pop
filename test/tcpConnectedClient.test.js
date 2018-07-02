const TCPConnectedClientFactory = require('../lib/tcpConnectedClient.js').TCPConnectedClientFactory

describe('TCPClient', () => {
  const clientPort = 5001
  const clientAddress = '127.0.0.0'
  const handshakeQuit = 221
  const mockMessage = 'Test String'
  const mockSocket = {
    remoteAddress: clientAddress,
    remotePort: clientPort,
    name: `${clientAddress}:${clientPort}`,
    write: jest.fn(),
    destroy: jest.fn()
  }
  const mockHandshake = {
    parseMessage: jest.fn(() => { return new Promise((resolve, reject) => { resolve(250) }) }),
    responses: { quit: handshakeQuit }
  }

  let client
  let mockWrite
  let mockDestroy

  beforeEach(() => {
    client = TCPConnectedClientFactory.build(mockSocket, mockHandshake)
    mockWrite = jest.spyOn(mockSocket, 'write')
    mockDestroy = jest.spyOn(mockSocket, 'destroy')
    mockDestroy.mockClear()
  })

  it('creates the name', () => {
    expect(client.name).toBe(`${clientAddress}:${clientPort}`)
  })

  describe('receiveMessage', () => {
    it('writes a message to the socket', () => {
      client.receiveMessage(mockMessage)
      expect(mockWrite).toHaveBeenCalledWith(mockMessage)
    })
  })

  describe('parseMessage', () => {
    it('executes the handshake', () => {
      let spyHandshake = jest.spyOn(mockHandshake, 'parseMessage')
      client.parseMessage(mockMessage)
      expect(spyHandshake).toHaveBeenCalledWith(mockMessage)
    })

    it('handles the reposnse from the async', async () => {
      let handleResponseSpy = jest.spyOn(client, 'handleResponse')
      await client.parseMessage(mockMessage)
      expect(handleResponseSpy).toHaveBeenCalledWith(250)
    })
  })

  describe('closeConnection', () => {
    it('destroys the socket connection', () => {
      client.closeConnection()
      expect(mockDestroy).toHaveBeenCalledTimes(1)
    })
  })

  describe('handleResponse', () => {
    const response = 250
    it('sends response back to client', () => {
      client.handleResponse(response)
      expect(mockWrite).toHaveBeenCalledWith(response.toString())
    })

    it('closes connection on 221 response', () => {
      client.handleResponse(handshakeQuit)
      expect(mockDestroy).toHaveBeenCalledTimes(1)
    })

    it('keeps connection open when not a 221 reponse', () => {
      client.handleResponse(response)
      expect(mockDestroy).toHaveBeenCalledTimes(0)
    })
  })
})
