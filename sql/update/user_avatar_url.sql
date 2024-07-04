update users
set avatar_url = ?, last_update = datetime('now')
where id = ?;