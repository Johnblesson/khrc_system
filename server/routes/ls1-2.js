import { Router } from "express";
const router = Router();

import { 
    createStorage, 
    getStorage,
    findStorage,
    updateStorage,
    deleteStorage,
    ls1_2_View
    } from "../controllers/ls1-2.js";

    import { ensureAuthenticated } from "../middleware/isAuth.js";

router.post('/ls1-2-storage', ensureAuthenticated, createStorage);
router.get('/view-ls1-2', ensureAuthenticated, getStorage);
router.get('/view-ls1-2/:id', ensureAuthenticated, ls1_2_View);
router.put('/ls1-2-storage/:id', ensureAuthenticated, updateStorage);
router.delete('/ls1-2-storage/:id', ensureAuthenticated, deleteStorage);

export default router;