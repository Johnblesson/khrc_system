import { Router } from "express";
const router = Router();

import { 
    createStorage, 
    getStorage,
    findStorage,
    updateStorage,
    deleteStorage
    } from "../controllers/css.js";

router.post('/storage', createStorage);
router.get('/view-css', getStorage);
router.put('/storage/:id', updateStorage);
router.delete('/storage/:id', deleteStorage);

export default router;