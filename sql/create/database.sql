create table if not exists users
(
  id integer primary key autoincrement,
  status varchar(12) not null,
  username varchar(50) not null,
  password varchar(255) not null,
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
  id integer primary key autoincrement ,
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
  id integer primary key autoincrement ,
  title varchar(100) not null,
  created_at timestamp not null,
  last_update timestamp not null,
  person_name varchar(100) not null,
  user_id integer not null,
  status varchar(12) not null,
  foreign key (user_id) references users (id)
);

create table if not exists timelines
(
  id integer primary key autoincrement ,
  title varchar(100) not null,
  description varchar(5000) not null,
  created_at timestamp not null,
  last_update timestamp not null,
  affair_id integer not null,
  foreign key (affair_id) references affairs (id)
);

create table if not exists priorities
(
  id integer primary key autoincrement,
  name varchar(20) not null,
  weight integer not null,
  weekday varchar(20) not null,
  date_start timestamp not null,
  date_end timestamp not null,
  minutes integer not null,
  hours integer not null,
  days integer not null,
  user_id integer not null,
  foreign key (user_id) references users (id)
);

create table if not exists tasks
(
  id integer primary key autoincrement,
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
  task_id integer not null,
  user_id integer not null,
  status varchar(12) not null,
  attempts integer not null,
  primary key (task_id, user_id),
  foreign key (task_id) references tasks (id),
  foreign key (user_id) references users (id)
);

create table if not exists categories
(
  id integer primary key autoincrement,
  name varchar(100) not null,
  color char(6) not null,
  icon varchar(20) not null,
  user_id integer not null,
  foreign key (user_id) references users (id)
);

create table if not exists tasks_categories
(
  task_id integer not null,
  category_id integer not null,
  primary key (task_id, category_id),
  foreign key (task_id) references tasks (id),
  foreign key (category_id) references categories (id)
);