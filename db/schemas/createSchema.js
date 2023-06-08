module.exports = `
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS ads CASCADE;


  CREATE TABLE users (
      id SERIAL PRIMARY KEY NOT NULL UNIQUE,
      email varchar(255) NOT NULL UNIQUE,
      password varchar(255) NOT NULL,
      name varchar(255) NOT NULL
  );


  CREATE TABLE ads (
    id SERIAL PRIMARY KEY NOT NULL,
    userId INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    thumbnail_url VARCHAR(255),
    description VARCHAR(255),
    category VARCHAR(255),
    price INTEGER NOT NULL
  );


`;