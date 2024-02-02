import { Router } from "express";
const router = Router();

import { 
    createStorage, 
    getStorage
    } from "../controllers/reception.js";

router.post('/reception', createStorage);
router.get('/api/reception', getStorage);
export default router;