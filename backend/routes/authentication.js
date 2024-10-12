import { Router } from 'express';
import { addUser, queryUser } from '../controllers/database.js';
import { createAccessToken } from '../controllers/authentication.js';

const router = Router();

router.post('/register', (req, res) => {
	try {
		const { username, password, role } = req.body;
		res.json(addUser(username, password, role));
	} catch (error) {
		res.json({ error: error.message });
	}
});

router.post('/login', (req, res) => {
	try {
		const { username, password } = req.body;
		if (queryUser(username, password)) {
			const accessToken = createAccessToken({
				username: username,
				password: password,
			});
			res.cookie('authcookie', accessToken, {
				maxAge: 900000,
				httpOnly: true,
				secure: true,
				sameSite: 'Strict',
			});
			res.json({ token: 'accessToken', logged: true });
		} else {
			res.json({ Message: 'Username or Password incorrect', logged: false });
		}
	} catch (error) {
		res.json({ error: error.message, logged: false });
	}
});

router.post('/logout', (req, res) => {
	try {
		if (req.cookies.authcookie) {
			res.clearCookie('authcookie', {
				httpOnly: true,
				secure: true,
				sameSite: 'Strict',
			});
			res.json({ message: 'Cookie cleared', logged: false });
		} else {
			throw new Error('Auth Cookie not Found');
		}
	} catch (error) {
		res.json({ error: error.message, logged: false });
	}
});

export default router;
