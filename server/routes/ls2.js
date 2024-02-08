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

    import { ensureAuthenticated } from "../middleware/isAuth.js";

router.post('/ls2-storage', ensureAuthenticated, createStorage);
router.get('/all-ls2', ensureAuthenticated, getStorage);
router.get('/view-ls2/:id', ensureAuthenticated, ls2View);
router.put('/ls2-storage/:id', ensureAuthenticated, updateStorage);
router.delete('/ls2-storage/:id', ensureAuthenticated, deleteStorage);

export default router;