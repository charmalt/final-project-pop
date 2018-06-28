const PopServer = require('../lib/popServer')

describe('Feature Test', () => {
  let server
  beforeAll(() => {
    server = new PopServer()
    console.log = jest.fn()
  })

  beforeEach(() => {
    console.log.mockClear()
  })

  it('Pop Server registers connection', () => {
    server.start()
    expect(console.log.mock.calls[0][0]).toEqual('Server started')
  })

  it('Pop Server terminates connection', () => {
    server.close()
    expect(console.log.mock.calls[0][0]).toEqual('Server closed')
  })
})
