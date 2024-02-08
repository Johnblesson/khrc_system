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

    import { ensureAuthenticated } from "../middleware/isAuth.js";

router.post('/ls1-storage', ensureAuthenticated, createStorage);
router.get('/view-ls1', ensureAuthenticated, getStorage);
router.get('/view-ls1/:id', ensureAuthenticated, ls1View);
router.put('/ls1-storage/:id', ensureAuthenticated, updateStorage);
router.delete('/ls1-storage/:id', ensureAuthenticated, deleteStorage);

export default router;