module.exports = {
  weekday: {
    type: 'string',
    limit: [3, 6],
    rules: {
      name: 'Es un día de la semana',
      rule: value => ['mon', 'tues', 'wednes', 'thurs', 'fri', 'satur', 'sun'].includes(value)
    }
  },
  date_start: {
    rules: [
      value => { const date = new Date(value); return date instanceof Date && !isNaN(date)}
    ]
  },
  date_end: {
    rules: [
      value => { const date = new Date(value); return date instanceof Date && !isNaN(date)}
    ]
  },
  minutes: {
    type: 'number',
    rules: [
      {
        name: 'Mínimo 5 minutos y máximo 59',
        rule: value => value >= 5 && value <= 59
      },
      {
        name: 'Es un entero',
        rule: value => Number.isInteger(value)
      }
    ]
  },
  hours: {
    type: 'number',
    rules: [
      {
        name: 'Mínimo 0 horas y máximo 23',
        rule: value => value >= 0 && value <= 23
      },
      {
        name: 'Es un entero',
        rule: value => Number.isInteger(value)
      }
    ]
  },
  days: {
    type: 'number',
    rules: [
      {
        name: 'Mínimo 0 día y máximo 31',
        rule: value => value >= 1 && value <= 31
      },
      {
        name: 'Es un entero',
        rule: value => Number.isInteger(value)
      }
    ]
  }
}