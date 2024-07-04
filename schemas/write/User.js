module.exports = {
  username: {
    type: 'string',
    limit: [3, 50],
    rules: [
      value => /^[a-zA-Z0-9_-]{4,}$/.test(value)
    ]
  },
  password: {
    type: 'string',
    limit: [8, 64],
    rules: [
      {
        name: 'Tiene mayúsculas',
        rule: value => /[A-Z]/.test(value)
      },
      {
        name: 'Tiene minúsculas',
        rule: value => /[a-z]/.test(value)
      },
      {
        name: 'Tiene números',
        rule: value => /[0-9]/.test(value)
      },
      {
        name: 'Tiene caracteres especiales',
        rule: value => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)
      }
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
}