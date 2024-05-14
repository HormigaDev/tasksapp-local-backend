select
t.id as task_id,
t.title as task_title,
t.description as task_description,
t.status as task_status,
t.fixed as task_fixed,
t.created_at as task_created_at,
t.updated_at as task_updated_at,
t.run_date as task_run_date,
t.priority_id as task_priority_id
from tasks t
where t.id = ?;