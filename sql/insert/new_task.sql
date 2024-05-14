insert into tasks (
  title,
  description,
  run_date,
  priority_id,
  user_id,
  status,
  fixed,
  created_at,
  last_update
)
values (?, ?, ?, ?, ?, ?, ?, ?, ?);