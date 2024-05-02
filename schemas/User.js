module.exports = {
  username: {
    type: String,
    limit: [4, 50],
    rules: [
      value => /^[a-zA-Z0-9]{4,}$/.test(value)
    ]
  },
  password: {
    type: String,
    limite: [8, 20],
    rules: [
      value => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value)
    ]
  },
  email: {
    type: String,
    limit: [6, 50],
    rules: [
      value => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value)
    ]
  },
  type: {
    type: String,
    limit: [3, 12],
    rules: [
      value => ['admin', 'user', 'none'].includes(value)
    ]
  },
  status: {
    type: String,
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
    type: String,
    limit: [6, 255],
    rules: [
      value => /^(https?|ftp):\/\/[^\s/$.?#-][^\s]*$/i.test(value)
    ]
  },
}