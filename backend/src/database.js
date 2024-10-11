import Database from 'better-sqlite3';

const database = () => {
	try {
		const database = new Database('foobar.db', { verbose: console.log });
		database.exec(`
            CREATE TABLE user(
              id INTEGER PRIMARY KEY,
              username TEXT,
              password TEXT,
              role INTEGER,
              profilePicture BLOB,
              created_at TEXT
            ) STRICT
          `);

		database.exec(`
            CREATE TABLE settings(
              id INTEGER PRIMARY KEY,
              name TEXT,
              value TEXT,
              user_id INTEGER
            ) STRICT
          `);

		database.exec(`
            CREATE TABLE roles(
              id INTEGER PRIMARY KEY,
              name TEXT
            ) STRICT
          `);
		return database;
	} catch (error) {
		const database = Database('foobar.db', { verbose: console.log });
		return database;
	}
};

export const addUser = (username, password, role) => {
	const insert = database().prepare(
		'INSERT INTO user (username, password, role, created_at ) VALUES (?, ?, ?,?)',
	);
	return insert.run(username, password, role, Date.now());
};

export const queryAll = () => {
	const query = database().prepare('SELECT * FROM user ORDER BY id DESC');
	return query.all();
};
