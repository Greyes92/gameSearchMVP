DROP DATABASE gamesearch_db;
DROP TABLE IF EXISTS favorites_list;
DROP TABLE IF EXISTS wishlist;
DROP TABLE IF EXISTS users;



CREATE DATABASE gamesearch_db;
\c gamesearch_db;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    user_name VARCHAR(50),
    password text
);

CREATE TABLE wishlist (
    wishlist_id SERIAL PRIMARY KEY,
    title VARCHAR(50),
    release_date DATE,
    platforms text,
    user_id int,
    FOREIGN KEY (user_id) REFERENCES users ON DELETE CASCADE
);

CREATE TABLE favorites_list (
    favslist_id SERIAL PRIMARY KEY,
    title VARCHAR(50),
    score numeric,
    platforms text,
    user_id int,
    FOREIGN KEY (user_id) REFERENCES users ON DELETE CASCADE
);