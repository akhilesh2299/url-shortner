

import { Router } from "express";
import { urlShortner, resolveUrl } from "../controllers/url";

const router = Router();

router.get('/', (_, res) => {
    res.render('form', { shortUrl: null });
});

router.post('/shorten', urlShortner);
router.get('/shorten/:id', resolveUrl);


export default router