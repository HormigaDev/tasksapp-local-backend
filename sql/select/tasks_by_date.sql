select
t.id as task_id,
t.title as task_title,
p.name as priority_name,
p.weight as priority_weight
from tasks t
join priorities p on t.priority_id = p.id
where t.user_id = ? and date(t.run_date) = ?;
select
c.id as category_id,
c.name as category_name,
c.color as category_color,
c.icon as category_icon
from categories c
where c.user_id = ?