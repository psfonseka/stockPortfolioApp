\connect portfolio; 

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(40) NOT NULL,
  full_name VARCHAR(40) NOT NULL,
  balance DECIMAL(12,2) NOT NULL,
  token VARCHAR(40) NOT NULL
);

CREATE TABLE stocks (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  quantity INTEGER NOT NULL,
  tracker VARCHAR(40) NOT NULL
);

CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  stock_id INTEGER REFERENCES stocks(id),
  trade VARCHAR(40) NOT NULL,
  quantity INTEGER NOT NULL,
  price DECIMAL(12,2) NOT NULL
);
