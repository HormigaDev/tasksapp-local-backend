update priorities set 
date_start = '{{timeStart}}',
date_end = '{{timeEnd}}',
mon = {{mon}},
tues = {{tues}},
wednes = {{wednes}},
thurs = {{thurs}},
fri = {{fri}},
satur = {{satur}},
sun = {{sun}},
minutes = ?,
hours = ?,
days = ?
where user_id = ? and weight = ?;