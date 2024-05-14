module.exports = {
  priority_id: {
    type: 'number',
    rules: [
      value => Number.isInteger(value)
    ]
  },
  schedule_id: {
    type: 'number',
    rules: [
      value => Number.isInteger(value)
    ]
  }
}