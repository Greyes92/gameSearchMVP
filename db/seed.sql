TRUNCATE favorites_list RESTART IDENTITY CASCADE;
TRUNCATE wishlist RESTART IDENTITY CASCADE;
TRUNCATE users RESTART IDENTITY CASCADE;

CREATE TABLE users (
    user_id SERIAL ,
    name VARCHAR(50),
    user_name text PRIMARY KEY,
    password text
);

CREATE TABLE wishlist (
    wishlist_id SERIAL PRIMARY KEY,
    title VARCHAR(50),
    release_date DATE,
    platforms text,
    user_name text,
    FOREIGN KEY (user_name) REFERENCES users ON DELETE CASCADE
);

CREATE TABLE favorites_list (
    favslist_id SERIAL PRIMARY KEY,
    title VARCHAR(50),
    score numeric,
    platforms text,
    user_name text,
    FOREIGN KEY (user_name) REFERENCES users ON DELETE CASCADE
);

INSERT INTO users (name, user_name,password) VALUES ('Gibran Reyes', 'greyesdev', 'password');
INSERT INTO users (name, user_name,password) VALUES ('Cristal Herrera', 'wifey', 'password');

INSERT INTO wishlist (title, release_date, platforms, user_name) VALUES ('God of War: Ragnarok', '2022-12-31' , 'PS5', 'greyesdev');
INSERT INTO wishlist (title, release_date, platforms, user_name) VALUES ('Forspoken', '2022-10-11' , 'PC, PS5', 'greyesdev');
INSERT INTO wishlist (title, release_date, platforms, user_name) VALUES ('A Plague Tale: Requiem', '2022-06-17' , 'PC, PS5, XBOX SX, NES Switch', 'greyesdev');
INSERT INTO wishlist (title, release_date, platforms, user_name) VALUES ('Forspoken', '2022-10-11' , 'PC, PS5', 'wifey');
INSERT INTO wishlist (title, release_date, platforms, user_name) VALUES ('Animal Crossing: New Horizons', '2022-10-11' , 'PC, PS5', 'wifey');

INSERT INTO favorites_list (title, score, platforms, user_name) VALUES ('Elden Ring', 4.44, 'PC, PS5, XBOX SX', 'greyesdev');
INSERT INTO favorites_list (title, score, platforms, user_name) VALUES ('Elden Ring', 4.44, 'PC, PS5, XBOX SX', 'greyesdev');
