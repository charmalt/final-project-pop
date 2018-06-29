class POPDbInterface {
  constructor (connection) {
    this.connection = connection
  }

  async pull () {
    let response = await this.connection.client.query(`select * from mail`)
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
