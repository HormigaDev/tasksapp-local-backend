begin transaction;

-- Paso 1. Se inserta un nuevo usuario --
insert into users(
  username,
  password,
  email,
  type,
  status,
  created_at,
  last_update,
  last_session,
  avatar_url
)
values (
  ?,
  ?,
  ?,
  ?,
  ?,
  ?,
  ?,
  ?,
  ?
);

-- Paso 2. Se inserta un nuevo teléfono --
insert into phones (ddd, ph_number, type)
values (?, ?, ?);

-- Paso 3. Se relaciona el usuario con el teléfono --
insert into  users_phone (user_id, phone_id)
select u.user_id as user_id, p.phone_id as phone_id
from users u
join phones p on u.email = ? and p.ddd = ? and p.ph_number = ?;

commit;