INSERT INTO settings (name, value, user_id) VALUES ("bgColor", "red",1);
INSERT INTO roles (name) VALUES ("user");

UPDATE settings SET value = ? INNER JOIN user ON settings.user_id = user.id WHERE user.username = ? and name = ?


UPDATE settings SET value = ? WHERE user_id = (SELECT id FROM user WHERE username = ?) AND name = ?;



DELETE FROM user

select * from user

SELECT * FROM user WHERE username = "alessandro@lamparelli.eu"


SELECT user.username,user.profilePicture, roles.name as role FROM roles INNER JOIN user ON roles.id = user.role WHERE user.username = ?

SELECT settings.name, settings.value FROM settings INNER JOIN user ON settings.user_id = user.id WHERE user.username = "alessandro@lamparelli.eu" and name = "bgColor"
