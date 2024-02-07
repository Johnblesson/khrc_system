import { Router } from "express";
const router = Router();

import { 
    createStorage, 
    getStorage,
    findStorage,
    updateStorage,
    deleteStorage,
    ls1View,
    } from "../controllers/ls1.js";

router.post('/ls1-storage', createStorage);
router.get('/view-ls1', getStorage);
router.get('/view-ls1/:id', ls1View);
router.put('/ls1-storage/:id', updateStorage);
router.delete('/ls1-storage/:id', deleteStorage);

export default router;