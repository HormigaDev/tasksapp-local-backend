insert into users(
  username,
  email,
  type,
  status,
  created_at,
  last_update,
  last_session,
  avatar_url
)
values (?, ?, ?, ?, ?, ?, ?, ?);