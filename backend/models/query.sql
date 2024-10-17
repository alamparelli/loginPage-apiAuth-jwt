INSERT INTO roles (name) VALUES ("admin");
INSERT INTO roles (name) VALUES ("user");

DELETE FROM user

select * from user


SELECT user.username, roles.name
FROM roles
INNER JOIN user
ON roles.id = user.role
WHERE user.role = 1;
