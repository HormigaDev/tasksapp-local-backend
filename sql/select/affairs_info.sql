select
a.id as affair_id,
a.title as affair_title,
a.created_at as affair_created_at,
a.last_update as affair_last_update,
a.person_name as affair_person_name
from affairs a
where a.status in ({{status}})
 and 
lower(a.title) like '%' || lower(?) || '%'
 or 
lower(a.person_name) like '%' || lower(?) || '%'
 and 
a.user_id = ?
order by a.{{column}} {{order}} limit ? offset ?;