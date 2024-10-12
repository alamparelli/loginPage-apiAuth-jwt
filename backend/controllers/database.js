import Database from 'better-sqlite3';
import { userTable, settingsTable, roleTable } from '../models/sqliteDB.js';
import 'dotenv/config';
import { createHash, checkHash } from './authentication.js';

const database = () => {
	// Connect to or create the db
	try {
		const database = Database('localDb.db');
		return database;
	} catch (error) {
		const database = new Database('localDb.db');
		database.exec(userTable);
		database.exec(settingsTable);
		database.exec(roleTable);
		return database;
	}
};

export const addUser = (username, password, role) => {
	const hash = createHash(password);
	const insert = database().prepare(
		'INSERT INTO user (username, password, role, created_at ) VALUES (?, ?, ?,?)',
	);
	insert.run(username, hash, role, Date.now());
	return { status: `${username} added in the DB` };
};

export const queryUser = (username, password) => {
	const query = database().prepare('SELECT * FROM user WHERE username = ?');
	const user = query.get(username);
	if (user) {
		const isValid = checkHash(password, user.password);
		if (isValid) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
};

export const queryAll = () => {
	const query = database().prepare('SELECT * FROM user ORDER BY id DESC');
	return query.all();
};

export const setPicture = (image) => {
	// record the image as blob in the db
	try {
		fs.readFile(image, (err, data) => {
			if (err) throw err;
			const base64Image = data.toString('base64');

			const insert = database().prepare(
				'INSERT INTO user (profilePicture) VALUES (?) WHERE username = ?',
			);
			insert.run(base64Image, username);
			return { status: `${username} added in the DB` };
		});
	} catch (error) {
		return error.message;
	}
};

export const getPicture = (username) => {
	//retrieve image for the user
	try {
		const query = database().prepare(
			'SELECT profilePicture FROM user WHERE username = ?',
		);
		const user = query.get(username);
		if (user) {
			return user.profilePicture; //in Base64Image
		} else {
			return false;
		}
	} catch (error) {
		return error.message;
	}
};

export const getRole = (username) => {
	//retrieve the user role
	try {
		const query = database().prepare(
			'SELECT role FROM user WHERE username = ?',
		);
		const user = query.get(username);
		if (user) {
			return user.role;
		} else {
			return false;
		}
	} catch (error) {
		return error.message;
	}
};

export const setSetting = (settingName, value, username) => {
	//record a setting
};

export const getSetting = (settingName, username) => {
	//retrieve a specific settings
};
