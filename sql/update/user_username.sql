update users
set username = ?, last_update = datetime('now')
where id = ?;