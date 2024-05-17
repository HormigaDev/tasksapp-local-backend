select
c.id as category_id,
c.name as category_name,
c.color as category_color,
c.icon as category_icon
from categories c
left join tasks_categories tc on c.id = tc.category_id
where tc.task_id = ?;