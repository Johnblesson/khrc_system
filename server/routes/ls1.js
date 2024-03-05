import { Router } from "express";
const router = Router();

import { 
    createStorage, 
    getStorage,
    findStorage,
    updateStorage,
    deleteStorage,
    ls1View,
    ls1_1Table,
    getAll_ls11,
    edit,
    updateStorage1,
    } from "../controllers/ls1.js";

    import { ensureAuthenticated } from "../middleware/isAuth.js";
    import { superAdminOnly } from "../middleware/sudo.js";

router.post('/ls1-storage', ensureAuthenticated, createStorage);
router.get('/ls1-1-table', ensureAuthenticated, ls1_1Table);
router.get('/view-ls1', ensureAuthenticated, getStorage);
router.get('/view-ls1/:id', ensureAuthenticated, ls1View);
router.get('/all-ls11', ensureAuthenticated, getAll_ls11);
// router.put('/ls1-storage/:id', ensureAuthenticated, updateStorage);
router.delete('/ls1-storage/:id', ensureAuthenticated, deleteStorage);
router.get('/edit_ls11/:id', ensureAuthenticated, superAdminOnly, edit);
router.patch('/edit_ls11/:id', ensureAuthenticated, superAdminOnly, updateStorage1);

export default router;