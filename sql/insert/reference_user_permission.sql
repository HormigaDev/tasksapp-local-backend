insert into user_permissions (
  permission_id,
  user_id
) values (
  (select id from permissions where name = upper('{{permission}}')),
  {{userId}}
);