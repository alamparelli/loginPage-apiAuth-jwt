import { Router } from 'express';
import { queryAll } from '../controllers/database.js';
import { checkToken } from '../controllers/authentication.js';

const router = Router();

router.get('/myprofile', (req, res) => {
	if (checkToken(req.cookies.authcookie)) {
		const query = queryAll();
		res.status(200).json(query);
	} else {
		res.status(401).json({ Access: 'Not Authorized' });
	}
});

export default router;
