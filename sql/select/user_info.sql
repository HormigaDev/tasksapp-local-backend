select
  u.id as user_id,
  u.username as username,
  u.email as email,
  coalesce(a.file_data, 'default') as avatar_url,
  u.type as type,
  u.status as status,
  p.id as phone_id,
  p.ddd as phone_ddd,
  p.ph_number as phone_number,
  p.type as phone_type
from users u
inner join users_phone up on u.id = up.user_id
inner join phones p on up.phone_id = p.id
left join avatars a on u.id = a.user_id
where u.id = ?;
