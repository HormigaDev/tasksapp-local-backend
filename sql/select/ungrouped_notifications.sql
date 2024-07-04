select
    n.task_id as id,
    p.name as name,
    t.run_date as "runDate",
    t.title as title,
    t.description as description,
    case
        when julianday(t.run_date) - julianday('now') <= 7 then
            p.weight / case 
                            when julianday(t.run_date) - julianday('now') + 1 = 1 then 0.5 
                            else julianday(t.run_date) - julianday('now') + 1 
                        end
        else
            null -- ignorar tareas que no cumplen con la condición
    end as score
from
    notifications n
join
    tasks t on t.id = n.task_id
join
    priorities p on p.id = t.priority_id
where
  t.status = 'created' -- solo tareas no finalizadas
    and t.user_id = ?
    and n.status = 'pending'
order by
    score asc;
