

import { Router } from "express";
import { urlShortner } from "../controllers/url";

const router = Router();

router.post('/url', urlShortner);


export default router