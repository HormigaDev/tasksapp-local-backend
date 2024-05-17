select
t.id as task_id,
t.title as task_title,
p.name as priority_name,
p.weight as priority_weight
from tasks t
join priorities p on t.priority_id = p.id
where t.fixed = 1 and t.user_id = ?;