const PopServer = require('../../lib/popServer')
const net = require('net')

describe('Feature Test', () => {
  let server
  beforeAll(() => {
    server = new PopServer()
    console.log = jest.fn()
    server.start()
  })

  afterAll((done) => {
    server.close()
    done()
  })

  beforeEach(() => {
    console.log.mockClear()
  })
  it('Pop Server starts and terminates connection', async () => {
    let server2 = new PopServer({ host: '127.0.0.1', port: 1337 })
    await server2.start()
    await server2.close()
    expect(console.log.mock.calls[0][0]).toEqual('Server started')
    expect(console.log.mock.calls[1][0]).toEqual('Server closed')
  })

  it('is able to to talk to a client', (done) => {
    let socket = net.createConnection(5001, '127.0.0.1', async () => {
      socket.write('Data')
    })
    setTimeout(() => {
      expect(console.log.mock.calls[0][0].match(/[0-9]*:[0-9]* connected$/)).toBeTruthy()
      expect(console.log.mock.calls[1][0]).toEqual('Data')
      done()
    }, 100)
  })

  it('registers a closed connection', (done) => {
    let socket = net.createConnection(5001, '127.0.0.1', async () => {
      socket.destroy()
    })
    setTimeout(() => {
      expect(console.log.mock.calls[0][0].match(/[0-9]*:[0-9]* connected$/)).toBeTruthy()
      expect(console.log.mock.calls[1][0].match(/[0-9]*:[0-9]* disconnected$/)).toBeTruthy()
      done()
    }, 100)
  })
})
