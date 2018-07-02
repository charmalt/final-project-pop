const POPDbInterface = require('../models/popDBInterface')

describe('POPDbInterface', () => {
  let popDbInterface
  let mockConnection = { client: { query: jest.fn(() => { return new Promise((resolve, reject) => { resolve({rows: 'DATA'}) }) }) } }
  let mockFailedConnection = { client: { query: jest.fn(() => { return new Promise((resolve, reject) => { reject(new Error('FAIL')) }) }) } }

  it('returns the data when response resolves', async () => {
    popDbInterface = new POPDbInterface(mockConnection)
    let result = await popDbInterface.pull()
    expect(result).toEqual('DATA')
  })

  it('returns null if there is an error', async () => {
    console.log = jest.fn()
    popDbInterface = new POPDbInterface(mockFailedConnection)
    let result = await popDbInterface.pull()
    expect(result).toBeFalsy()
  })
})
