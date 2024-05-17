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
values (?, ?, ?, (
  select id
  from priorities
  where weight = ? and user_id = ?
), ?, ?, ?, ?, ?);