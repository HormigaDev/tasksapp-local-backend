module.exports = {
  title: {
    type: 'string',
    limit: [10, 100]
  },
  description: {
    type: 'string',
    limit: [20, 5000]
  },
  status: {
    type: 'string',
    limit: [3, 12],
    rules: [
      {
        rule: value => ['created', 'ended', 'archived'].includes(value),
        name: 'Lista de estados'
      }
    ]
  },
  fixed: {
    type: 'number',
    rules: [
      {
        rule: value => Number.isInteger(value) && (value === 0 || value === 1),
        name: 'Valor entero booleano: 0 o 1'
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
  },
  user_id: {
    type: 'number',
    rules: [
      {
        rule: value => Number.isInteger(value),
        name: 'Número entero'
      }
    ]
  },
  priority_id: {
    type: 'number',
    rules: [
      {
        rule: value => Number.isInteger(value),
        name: 'Número entero'
      },
      {
        rule: value => value >= 1 && value <= 4,
        name: 'Número entre 1 y 4'
      }
    ]
  }
}