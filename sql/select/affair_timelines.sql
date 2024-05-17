select
t.id as timeline_id,
t.title as timeline_title,
t.description as timeline_description,
t.created_at as timeline_created_at,
t.last_update as timeline_last_update
from timelines t
where t.affair_id = ?
order by t.created_at desc;