import Database from 'better-sqlite3';
import { userTable, settingsTable, roleTable } from '../models/sqliteDB.js';
import 'dotenv/config';
import { createHash, checkHash } from './authentication.js';

const database = () => {
	// Connect to or create the db
	try {
		const database = new Database('localDb.db');
		database.exec(userTable);
		database.exec(settingsTable);
		database.exec(roleTable);
		return database;
	} catch (error) {
		const database = Database('localDb.db');
		return database;
	}
};

export const addUser = (username, password, role) => {
	try {
		const hash = createHash(password);
		const roleId = getRoleDefinition(role);
		if (!roleId) {
			throw new Error('Role is not valid');
		}
		const insert = database().prepare(
			'INSERT INTO user (username, password, role, created_at ) VALUES (?, ?, ?,?)',
		);
		insert.run(username, hash, roleId, Date.now());
		return { status: `${username} added in the DB` };
	} catch (error) {
		return { error: error.message };
	}
};

export const queryUser = (username) => {
	const query = database().prepare(
		'SELECT user.id, user.username,user.profilePicture, roles.name as role FROM roles INNER JOIN user ON roles.id = user.role WHERE user.username = ?',
	);
	const user = query.get(username);
	const bgColor = getSetting('bgColor', user.username);
	user.bgColor = bgColor.value;
	if (user) {
		return user;
	} else {
		return false;
	}
};

export const queryAll = () => {
	const query = database().prepare('SELECT * FROM user ORDER BY id DESC');
	return query.all();
};

// export const setPicture = (image) => {
// 	// record the image as blob in the db
// 	try {
// 		fs.readFile(image, (err, data) => {
// 			if (err) throw err;
// 			const base64Image = data.toString('base64');

// 			const insert = database().prepare(
// 				'INSERT INTO user (profilePicture) VALUES (?) WHERE username = ?',
// 			);
// 			insert.run(base64Image, username);
// 			return { status: `${username} added in the DB` };
// 		});
// 	} catch (error) {
// 		return error.message;
// 	}
// };

// export const getPicture = (username) => {
// 	//retrieve image for the user
// 	try {
// 		const query = database().prepare(
// 			'SELECT profilePicture FROM user WHERE username = ?',
// 		);
// 		const user = query.get(username);
// 		if (user) {
// 			return user.profilePicture; //in Base64Image
// 		} else {
// 			return false;
// 		}
// 	} catch (error) {
// 		return error.message;
// 	}
// };

const getRoleDefinition = (role) => {
	const query = database().prepare('SELECT id FROM roles WHERE name = ?');
	const roleId = query.get(role);
	if (!roleId) {
		throw new Error('Role not valid');
	}
	return roleId.id;
};

export const setSetting = (settingName, value, username) => {
	const query = database().prepare(
		'UPDATE settings SET value = ? WHERE user_id = (SELECT id FROM user WHERE username = ?) AND name = ?',
	);
	query.run(value, username, settingName);
};

export const getSetting = (settingName, username) => {
	const query = database().prepare(
		'SELECT settings.name, settings.value FROM settings INNER JOIN user ON settings.user_id = user.id WHERE user.username = ? and name = ?',
	);
	const result = query.get(username, settingName);
	if (!result) {
		throw new Error('settings not found');
	}
	return result;
};
