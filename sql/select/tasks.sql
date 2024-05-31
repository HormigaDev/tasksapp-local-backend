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
where (lower(t.title) like '%' || lower(?) || '%' or lower(t.description) like '%' || lower(?) || '%')
and t.user_id = ?
and (
({{showarchiveds}} = 1 and t.status = 'archived') or
({{showendeds}} = 1 and t.status = 'ended') or
(t.status not in ('archived', 'ended'))
) and
({{priority}} = 0 or (p.weight = {{priority}}))
order by
case
  when t.fixed = 1 then 0
  else 1
end {{order}},
t.{{column}} {{order}} limit ? offset ?