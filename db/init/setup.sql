\connect portfolio; 

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(40) NOT NULL,
  full_name VARCHAR(40) NOT NULL,
  balance VARCHAR(12, 2) NOT NULL,
  token VARCHAR(40) NOT NULL
);

CREATE TABLE stocks (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  quantity INTEGER NOT NULL,
  stock VARCHAR(40) NOT NULL
);

--insert into users (email, full_name, user_id, balance) values ('john@gmail.com', 'John Joe', 'sekfsefklsfjl', 5000.00);