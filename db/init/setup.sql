\connect portfolio; 

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email varchar(40) NOT NULL,
  full_name varchar(40) NOT NULL,
  balance decimal(12, 2) NOT NULL,
  user_id varchar(40) NOT NULL
);

--insert into users (email, full_name, user_id, balance) values ('john@gmail.com', 'John Joe', 'sekfsefklsfjl', 5000.00);