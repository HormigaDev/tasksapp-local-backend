module.exports = {
  ddd: {
    type: String,
    limit: [2, 3],
    rules: [
      value => /^[0-9]{2,3}$/.test(value)
    ]
  },
  ph_number: {
    type: String,
    limit: [8, 10],
    rules: [
      value => /^[0-9]{8,10}$/.test(value)
    ]
  },
  type: {
    type: String,
    limit: [3, 12],
    rules: [
      value => ['home', 'work', 'cellphone'].includes(value)
    ]
  }
}