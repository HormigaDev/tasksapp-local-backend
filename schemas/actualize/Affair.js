const { title, person_name, status } = require('../write/Affair');

module.exports = {
  title, person_name, status: {
    type: 'string',
    rules: [
      {
        name: 'Está en la lista',
        rule: value => ['created', 'archived'].includes(value),
      }
    ]
  }
}