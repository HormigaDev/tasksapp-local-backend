select
  n.task_id as id,
  p.name as name,
  count(n.task_id) as quantity
from
  notifications n
join
  tasks t on t.id = n.task_id
join
  priorities p on p.id = t.priority_id
where
  julianday(t.run_date) - julianday('now') <= 7
  and t.status = 'created' -- solo tareas no finalizadas
  and t.user_id = ?
  and n.status = 'pending'
group by
  p.name
order by
  p.weight desc;
