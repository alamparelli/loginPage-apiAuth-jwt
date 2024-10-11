import { Router } from 'express';
import { addUser } from '../src/database.js';

import 'dotenv/config';

const router = Router();

console.log(process.env.ACCESS_TOKEN_SECRET);
console.log(process.env.REFRESH_TOKEN_SECRET);
console.log(process.env.SALT);

// generate and return accesstoken
// generate and return hashed password
// validate password

router.post('/adduser', (req, res) => {
	const { username, password, role } = req.body;
	res.json(addUser(username, password, role));
});

export default router;
