update users
set password = ?, last_update = datetime('now')
where id = ?;