update notifications
set status = 'ignored', attempts = attempts + 1
where user_id = ? 
and task_id in (select t.id
                from tasks t
                join priorities p on t.priority_id = p.id
                where p.name = ?);
