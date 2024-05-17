const { asc_desc } = require("./GetTasks");

module.exports = {
  search: {
    type: 'string',
    limit: [0, 1500]
  },
  page: {
    type: 'number',
    rules: [
      {
        name: 'Es un entero positivo',
        rule: value => value >= 0 && Number.isInteger(value)
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
  archiveds: {
    type: 'boolean'
  },
  order_by: {
    type: 'string',
    rules: [
      {
        name: 'Está en la lista de valores permitidos',
        rule: value => ['title', 'created_at', 'person_name', 'last_update'].includes(value)
      }
    ]
  },
  asc_desc
}