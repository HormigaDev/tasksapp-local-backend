const User = require('../write/User');

module.exports = {
  username: User.username,
  email: User.email,
  user_type: User.user_type,
  status: User.status,
  avatar_url: User.avatar_url
}