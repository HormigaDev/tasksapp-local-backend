insert into tasks (
  title,
  description,
  run_date,
  user_id,
  priority_id,
  status,
  fixed,
  created_at,
  last_update
)
values (?, ?, ?, ?, ?, ?, ?, ?, ?);