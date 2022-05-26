TRUNCATE favorites_list RESTART IDENTITY CASCADE;
TRUNCATE wishlist RESTART IDENTITY CASCADE;
TRUNCATE users RESTART IDENTITY CASCADE;


INSERT INTO users (name, user_name,password) VALUES ('Gibran Reyes', 'greyesdev', 'password');
INSERT INTO users (name, user_name,password) VALUES ('Cristal Herrera', 'wifey', 'password');

INSERT INTO wishlist (title, release_date, platforms, user_name) VALUES ('God of War: Ragnarok', '2022-12-31' , 'PS5', 'greyesdev');
INSERT INTO wishlist (title, release_date, platforms, user_name) VALUES ('Forspoken', '2022-10-11' , 'PC, PS5', 'greyesdev');
INSERT INTO wishlist (title, release_date, platforms, user_name) VALUES ('A Plague Tale: Requiem', '2022-06-17' , 'PC, PS5, XBOX SX, NES Switch', 'greyesdev');
INSERT INTO wishlist (title, release_date, platforms, user_name) VALUES ('Forspoken', '2022-10-11' , 'PC, PS5', 'wifey');
INSERT INTO wishlist (title, release_date, platforms, user_name) VALUES ('Animal Crossing: New Horizons', '2022-10-11' , 'PC, PS5', 'wifey');

INSERT INTO favorites_list (title, score, platforms, user_name) VALUES ('Elden Ring', 4.44, 'PC, PS5, XBOX SX', 'greyesdev');
INSERT INTO favorites_list (title, score, platforms, user_name) VALUES ('Elden Ring', 4.44, 'PC, PS5, XBOX SX', 'greyesdev');
