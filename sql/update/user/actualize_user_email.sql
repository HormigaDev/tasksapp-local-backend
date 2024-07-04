update users
set email = ?, last_update = datetime('now')
where id = ?;