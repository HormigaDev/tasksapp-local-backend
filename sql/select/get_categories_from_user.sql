select
c.id as category_id,
c.name as category_name,
c.description as category_description,
c.color as category_color,
c.icon as category_icon
from categories c
inner join users_categories uc on c.id = uc.category_id
where uc.user_id = ?;