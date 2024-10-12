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
	return { succes: `${username} added in the DB` };
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
