select id from users where lower(email) = lower(?) or lower(username) = lower(?);