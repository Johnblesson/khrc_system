import { Router } from "express";
const router = Router();

import { 
    createStorage, 
    getStorage,
    findStorage,
    updateStorage,
    deleteStorage
    } from "../controllers/ls2.js";

router.post('/ls2-storage', createStorage);
router.get('/api/ls2-storages', getStorage);
router.put('/ls2-storage/:id', updateStorage);
router.delete('/ls2-storage/:id', deleteStorage);

export default router;