module.exports = {
  categories: {
    type: ['number'],
    rules: [
      {
        name: 'Todos los elementos son enteros',
        rule: value => value.every(item => Number.isInteger(item))
      }
    ]
  },
  priorities: {
    type: ['number'],
    rules: [
      {
        name: 'Todos los elementos son enteros',
        rule: value => value.every(item => Number.isInteger(item))
      }
    ]
  },
  order_by: {
    type: 'string',
    limit: [1, 50]
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
        name: 'Es mayor que 0 y menor o igual a 100',
        rule: value => value > 0 && value <= 100
      },
      {
        name: 'Es un entero',
        rule: value => Number.isInteger(value)
      }
    ]
  },
  asc_desc: {
    type: 'boolean'
  }
}