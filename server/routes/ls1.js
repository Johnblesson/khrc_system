import { Router } from "express";
const router = Router();

import { 
    createStorage, 
    getStorage,
    findStorage,
    updateStorage,
    deleteStorage
    } from "../controllers/ls1.js";

router.post('/ls1-storage', createStorage);
router.get('/api/ls1-storages', getStorage);
router.put('/ls1-storage/:id', updateStorage);
router.delete('/ls1-storage/:id', deleteStorage);

export default router;