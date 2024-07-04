update users
set user_type = ?, last_update = datetime('now')
where id = ?;