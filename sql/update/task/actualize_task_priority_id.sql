update tasks
set priority_id = (select id from priorities where weight = ? and user_id = {{user_id}})
where id = ?;