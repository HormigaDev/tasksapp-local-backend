select
id as category_id,
name as category_name,
color as category_color,
icon as category_icon
from categories
where user_id = ?;