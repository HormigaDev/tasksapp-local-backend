update notifications
set status = 'ignored', attempts = attempts + 1
where user_id = ? and task_id = ?