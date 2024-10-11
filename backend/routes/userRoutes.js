import { Router } from 'express';
// import { body, validationResult } from 'express-validator';
import { queryAll } from '../src/database.js';

const router = Router();

router.get('/alive', (req, res) => {
	res.json({ message: 'message' });
});

router.get('/getusers', (req, res) => {
	const query = queryAll();
	res.json(query);
});

export default router;
