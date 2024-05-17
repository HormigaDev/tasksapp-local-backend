select
t.id as task_id,
t.title as task_title,
t.status as task_status,
p.name as priority_name,
p.weight as priority_weight
from tasks t
join priorities p on t.priority_id = p.id
where t.user_id = ? and date(t.run_date) = ?
order by
  case
    when t.status = 'created' then 1
    when t.status = 'ended' then 2
    when t.status = 'archived' then 3
    else 4
  end,
  p.weight desc
limit 2;