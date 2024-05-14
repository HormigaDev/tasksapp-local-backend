module.exports = {
  name: {
    type: 'string',
    limit: [2, 100],
    rules: [
      {
        name: 'Es alfanumérico',
        rule: value => /^[a-zA-Z0-9 ]+$/.test(value)
      }
    ]
  },
  color: {
    type: 'string',
    limit: [6,6],
    rules: [
      {
        name: 'Es hexadecimal',
        rule: value => /^[0-9a-fA-F]+$/.test(value)
      }
    ]
  },
  icon: {
    type: 'string',
    limit: [1, 100],
    rules: [
      {
        name: 'Es alfanumérico',
        rule: value => /^[a-zA-Z0-9_-]+$/.test(value)
      }
    ]
  }
}