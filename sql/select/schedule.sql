select
date_start as time_start,
date_end as time_end,
minutes,
hours,
days,
mon,
tues,
wednes,
thurs,
fri,
satur,
sun
from priorities
where name = ? and user_id = ?;