describe('Feature Test', () => {
  let server
  beforeEach(() => {
    server = new PopServer()
    console.log = jest.fn()
    server.start()
  })

  afterAll(() => {
    server.close()
  })

  it('Pop Server registers connection', () => {
    expect(console.log.mock.calls[0][0]).toEqual('Server started')
  })

  it('Pop Server terminates connection', () => {
    expect(console.log.mock.calls[0][0]).toEqual('Server disconnected')
  })
})
