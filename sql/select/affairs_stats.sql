select
  sum(case when status = 'archived' then 1 else 0 end) as archived_affairs
from affairs where user_id = ? and date(created_at) between ? and ?;