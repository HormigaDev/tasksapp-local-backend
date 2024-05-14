module.exports = {
  ddd: {
    type: 'string',
    limit: [2, 3],
    rules: [
      value => /^[0-9]{2,3}$/.test(value)
    ]
  },
  ph_number: {
    type: 'string',
    limit: [8, 10],
    rules: [
      value => /^[0-9]{8,10}$/.test(value)
    ]
  },
  ph_type: {
    type: 'string',
    limit: [3, 12],
    rules: [
      value => ['home', 'work', 'cellphone'].includes(value)
    ]
  }
}