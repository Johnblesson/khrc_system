import { Router } from "express";
const router = Router();

import { 
    createStorage, 
    getStorage,
    findStorage,
    updateStorage,
    deleteStorage,
    ls2View
    } from "../controllers/ls2.js";

router.post('/ls2-storage', createStorage);
router.get('/all-ls2', getStorage);
router.get('/view-ls2/:id', ls2View);
router.put('/ls2-storage/:id', updateStorage);
router.delete('/ls2-storage/:id', deleteStorage);

export default router;