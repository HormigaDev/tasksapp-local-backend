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
  date: {
    rules: [
      value => { const date = new Date(value); return date instanceof Date && !isNaN(date)}
    ]
  }
}