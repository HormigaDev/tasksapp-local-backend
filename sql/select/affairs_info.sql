select
  a.id as affair_id,
  a.title as affair_title,
  a.created_at as affair_created_at,
  a.last_update as affair_last_update,
  a.person_name as affair_person_name,
  a.status as affair_status
from affairs a
where
  a.user_id = ?
  and (
    ({{status}} = 1 and a.status = 'archived') or
    a.status = 'created'
  )
  and (
    lower(a.title) like '%' || lower(?) || '%'
    or lower(a.person_name) like '%' || lower(?) || '%'
  )
order by
  a.{{column}} {{order}}
limit ? offset ?;