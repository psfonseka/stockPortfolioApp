\connect portfolio; 

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email varchar(40) NOT NULL,
  full_name varchar(40) NOT NULL,
  user_id varchar(40) NOT NULL,
);
