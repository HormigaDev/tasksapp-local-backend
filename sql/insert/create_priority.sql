insert into priorities (
  name,
  weight,
  weekday,
  date_start,
  date_end,
  minutes,
  hours,
  days,
  user_id
) values (?, ?, 'mon', '1900-01-01 00:00:00', '1900-01-01 00:00:00', 0, 0, 0, ?);