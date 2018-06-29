const PopClientHandshake = require('../lib/popClientHandshake')
const Database = require('../models/database')
jest.mock('../models/database')

describe('popClientHandshake', function () {
  let popClientHandshake
  let mockDatabase, spyDatabase
  mockDatabase = {
    getMessages: jest.fn()
  }

  beforeEach(function () {
    popClientHandshake = new PopClientHandshake(mockDatabase)

    spyDatabase = jest.spyOn(mockDatabase, 'getMessages')
  })

  describe('return messages', function () {
    it('should respond to client request Hello with 250', function () {
      expect(popClientHandshake.parseMessage('Hello')).toEqual('250')
    })
    it('should respond to client request MessageRequest with messages', function () {
      expect(popClientHandshake.parseMessage('MessageRequest')).toEqual('')
    })
  })

  describe('getting messages', function () {
    it('should query database for message', function () {
      expect(spyDatabase).toHaveBeenCalledTimes(1)
    })
  })
})
