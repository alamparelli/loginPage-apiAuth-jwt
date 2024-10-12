export const userTable = `
            CREATE TABLE user(
              id INTEGER PRIMARY KEY,
              username TEXT,
              password TEXT,
              role INTEGER,
              profilePicture BLOB,
              created_at TEXT
            ) STRICT
          `;

export const roleTable = `
            CREATE TABLE roles(
              id INTEGER PRIMARY KEY,
              name TEXT
            ) STRICT
          `;

export const settingsTable = `
            CREATE TABLE settings(
              id INTEGER PRIMARY KEY,
              name TEXT,
              value TEXT,
              user_id INTEGER
            ) STRICT
          `;
