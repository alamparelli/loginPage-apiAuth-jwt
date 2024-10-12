import { Router } from 'express';
// import { body, validationResult } from 'express-validator';
import { queryAll } from '../controllers/database.js';
import { checkToken } from '../controllers/authentication.js';

const router = Router();

router.get('/myprofile', (req, res) => {
	if (checkToken(req.cookies.authcookie)) {
		const query = queryAll();
		res.json(query);
	} else {
		res.json({ Access: 'Not Authorized' });
	}
});

export default router;
