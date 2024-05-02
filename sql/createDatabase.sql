create table if not exists users
(
  id integer primary key ,
  password varchar(255) not null,
  status varchar(12) not null,
  username varchar(50) not null,
  birthday date,
  email varchar(60),
  type varchar(12) not null,
  created_at timestamp not null,
  last_update timestamp not null,
  last_session timestamp not null,
  avatar_url varchar(255)
);

create table if not exists phones
(
  id integer primary key ,
  ddd varchar(3) not null,
  ph_number varchar(20) not null,
  type varchar(12) not null
);

create table if not exists users_phone
(
  user_id integer not null,
  phone_id integer not null,
  primary key (user_id, phone_id),
  foreign key (user_id) references users (id),
  foreign key (phone_id) references phones (id)
);

create table if not exists affairs
(
  id integer primary key ,
  title varchar(100) not null,
  created_at timestamp not null,
  last_update timestamp not null,
  user_id integer not null,
  person_id integer not null,
  foreign key (user_id) references users (id),
  foreign key (person_id) references persons (id)
);

create table if not exists timeline
(
  id integer primary key ,
  title varchar(100) not null,
  description varchar(5000) not null,
  created_at timestamp not null,
  affair_id integer not null,
  foreign key (affair_id) references affairs (id)
);

create table if not exists permissions
(
  id integer primary key ,
  name varchar(30) not null,
  weight integer not null
);

create table if not exists users_permissions
(
  id integer primary key,
  user_id integer not null,
  permission_id integer not null,
  primary key (user_id, permission_id),
  foreign key (user_id) references users (id),
  foreign key (permission_id) references permissions (id)
);

create table if not exists schedules
(
  id integer primary key,
  weekday varchar(20) not null,
  date_start timestamp not null,
  date_end timestamp not null,
  minutes integer not null,
  hours integer not null,
  days integer not null
);

create table if not exists priorities
(
  id integer primary key,
  name varchar(20) not null,
  num_order integer not null,
);

create table if not exists priorities_schedule_users
(
  id integer primary key,
  priority_id integer not null,
  schedule_id integer not null,
  user_id integer not null,
  foreign key (priority_id) references priorities (id),
  foreign key (schedule_id) references schedules (id),
  foreign key (user_id) references users (id)
);

create table if not exists tasks
(
  id integer primary key,
  title varchar(100) not null,
  description varchar(5000) not null,
  status varchar(12) not null,
  fixed integer not null,
  created_at timestamp not null,
  last_update timestamp not null,
  run_date timestamp not null,
  user_id integer not null,
  priority_id integer not null,
  foreign key (user_id) references users (id),
  foreign key (priority_id) references priorities (id)
);

create table if not exists notifications
(
  id integer primary key,
  task_id integer primary key,
  user_id integer primary key,
  message varchar(1000) not null,
  status varchar(12) not null,
  type varchar(12) not null,
  created_at timestamp not null,
  last_update timestamp not null,
  sent_at timestamp not null,
  read_at timestamp not null,
  foreign key (task_id) references tasks (id),
  foreign key (user_id) references users (id)
);

create table if not exists categories
(
  id integer primary key,
  name varchar(100) not null,
  description varchar(512),
  color char(6) not null,
  icon varchar(20) not null,
  created_at timestamp not null,
  last_update timestamp not null
);

create table if not exists tasks_categories
(
  id integer primary key,
  task_id integer not null,
  category_id integer not null,
  primary key (task_id, category_id),
  foreign key (task_id) references tasks (id),
  foreign key (category_id) references categories (id)
);

create table if not exists configurations
(
  id integer primary key,
  user_id integer not null,

  foreign key (user_id) references users (id)
);

create table if not exists logs
(
  id integer primary key,
  user_id integer not null,
  description varchar(1000) not null,
  log_type varchar(12) not null,
  log_table varchar(50) not null,
  log_date timestamp not null,
  foreign key (user_id) references users (id)
);