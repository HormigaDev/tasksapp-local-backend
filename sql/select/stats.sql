select
  sum(case when action_type = 'insert' and data_type = 'tasks' then 1 else 0 end) as created_tasks,
  sum(case when action_type = 'update' and data_type = 'tasks' then 1 else 0 end) as edited_tasks,
  sum(case when action_type = 'delete' and data_type = 'tasks' then 1 else 0 end) as deleted_tasks,
  sum(case when action_type = 'insert' and data_type = 'affairs' then 1 else 0 end) as created_affairs,
  sum(case when action_type = 'update' and data_type = 'affairs' then 1 else 0 end) as edited_affairs,
  sum(case when action_type = 'delete' and data_type = 'affairs' then 1 else 0 end) as deleted_affairs,
  sum(case when action_type = 'update' and data_type = 'users' and log_details like '%password%' then 1 else 0 end) as changed_passwords,
  sum(case when action_type = 'update' and data_type = 'users' and log_details like '%username%' then 1 else 0 end) as changed_usernames,
  sum(case when action_type = 'insert' and data_type = 'timelines' then 1 else 0 end) as created_timelines,
  sum(case when action_type = 'update' and data_type = 'timelines' then 1 else 0 end) as edited_timelines,
  sum(case when action_type = 'delete' and data_type = 'timelines' then 1 else 0 end) as deleted_timelines,
  sum(case when action_type = 'insert' and data_type = 'categories' then 1 else 0 end) as created_categories,
  sum(case when action_type = 'update' and data_type = 'categories' then 1 else 0 end) as edited_categories,
  sum(case when action_type = 'delete' and data_type = 'categories' then 1 else 0 end) as deleted_categories
from user_logs where user_id = ? and date(created_at) between ? and ?;