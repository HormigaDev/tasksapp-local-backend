module.exports = {
  title: {
    type: 'string',
    limit: [12, 100]
  },
  description: {
    type: 'string',
    limit: [1, 5000]
  },
  affair_id: {
    rules: [
      {
        name: 'Es nulo o Numero',
        rule: value => value === null || Number.isInteger(value)
      }
    ]
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