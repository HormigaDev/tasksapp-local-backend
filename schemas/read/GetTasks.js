module.exports = {
  page: {
    type: 'number',
    rules: [
      {
        name: 'Es un entero positivo',
        rule: value => Number.isInteger(value) && value >= 0
      }
    ]
  },
  limit: {
    type: 'number',
    rules: [
      {
        name: 'Es un entero positivo',
        rule: value => value > 0 && Number.isInteger(value)
      },
      {
        name: 'Está en la lista de valores permitidos',
        rule: value => [10, 20, 30, 50, 100].includes(value)
      }
    ]
  },
  search: {
    type: 'string',
    limit: [0, 1500]
  },
  priority: {
    type: 'number',
    rules: [
      {
        name: 'Es un entero',
        rule: value => Number.isInteger(value)
      },
      {
        name: 'Es un número entre 0 y 4',
        rule: value => value >= 0 && value <= 4
      }
    ]
  },
  order_by: {
    type: 'string',
    rules: [
      {
        name: 'Está en la lista de valores permitidos',
        rule: value => ['title', 'description', 'created_at', 'run_date'].includes(value)
      }
    ]
  },
  asc_desc: {
    type: 'string',
    rules: [
      {
        name: 'Es "asc" o "desc"',
        rule: value => ['asc', 'desc'].includes(value)
      }
    ]
  },
  categories: {
    type: ['number'],
    acceptNull: true,
    limit: [0, 100]
  }
}