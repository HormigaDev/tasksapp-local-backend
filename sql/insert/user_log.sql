insert into user_logs (
  user_id,
  action_type,
  data_type,
  log_details,
  created_at
) values (?, ?, ?, ?, datetime('now', 'localtime'));