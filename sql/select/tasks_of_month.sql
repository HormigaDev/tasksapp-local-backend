select
t.id as task_id,
t.title as task_title,
t.description as task_description,
t.status as task_status,
t.fixed as task_fixed,
t.created_at as task_created_at,
t.last_update as task_last_update,
t.run_date as task_run_date,
p.name as priority_name,
p.weight as priority_weight
from tasks t
left join priorities p on t.priority_id = p.id
where t.run_date >= date(?, 'start of month') and t.run_date < date(?, 'start of month', '+1 month') and t.user_id = ?;
