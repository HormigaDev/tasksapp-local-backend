select
  sum(case when status = 'ended' then 1 else 0 end) as finalized_tasks,
  sum(case when status = 'archived' then 1 else 0 end) as archived_tasks
from tasks where user_id = ? and date(run_date) between ? and ?;