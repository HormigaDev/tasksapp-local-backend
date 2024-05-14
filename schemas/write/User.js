module.exports = {
  username: {
    type: 'string',
    limit: [4, 50],
    rules: [
      value => /^[a-zA-Z0-9]{4,}$/.test(value)
    ]
  },
  email: {
    type: 'string',
    limit: [6, 50],
    rules: [
      value => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value)
    ]
  },
  user_type: {
    type: 'string',
    limit: [3, 12],
    rules: [
      {
        name: 'Está en la lista',
        rule: value => ['admin', 'user', 'none'].includes(value)
      }
    ]
  },
  status: {
    type: 'string',
    limit: [3, 12],
    rules: [
      value => ['active', 'inactive', 'banned'].includes(value)
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
  last_session: {
    rules: [
      value => { const date = new Date(value); return date instanceof Date && !isNaN(date)}
    ]
  },
  avatar_url: {
    type: 'string',
    limit: [6, 255],
    rules: [
      value => /^(https?|ftp):\/\/[^\s/$.?#-][^\s]*$/i.test(value)
    ]
  }
}