class POPDbInterface {
  constructor (connection) {
    this.connection = connection
  }

  async pull (userEmail) {
    let response = await this.connection.client.query(`select * from mail where mailto = '${userEmail}'`)
      .then((res) => {
        return res.rows
      })
      .catch((err) => {
        console.log(err.stack)
        return false
      })
    return response
  }
}

module.exports = POPDbInterface
