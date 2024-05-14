module.exports = {
  user_id: {
    type: 'number',
    rules: [
      {
        name: 'Es un entero',
        rule: value => Number.isInteger(value)
      }
    ]
  },
  page: {
    type: 'number',
    rules: [
      {
        name: 'Es un entero',
        rule: value => Number.isInteger(value)
      }
    ]
  },
  limit: {
    type: 'number',
    rules: [
      {
        name: 'Es un entero',
        rule: value => Number.isInteger(value)
      }
    ]
  }
}