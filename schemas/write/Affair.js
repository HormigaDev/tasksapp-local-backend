String,module.exports = {
  title: {
    type: 'string',
    limit: [6, 100]
  },
  user_id: {
    type: 'number',
    rules: [
      {
        name: 'Es un entero',
        rule: value => Number.isInteger(value)
      }
    ]
  },
  person_name: {
    type: 'string',
    limit: [3, 100]
  },
  created_at: {
    rules: [
      value => { const date = new Date(value); return date instanceof Date && !isNaN(date)}
    ]
  },
  last_update: {
    rules: [
      value => { const date = new Date(value); return date instanceof Date && !isNaN(date)}
    ]
  }
}