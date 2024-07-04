update users
set status = ?, last_update = datetime('now')
where id = ?;