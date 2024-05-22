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
    } from "../../controllers/storages/ls1.js";

    import { ensureAuthenticated } from "../../middleware/isAuth.js";
    // import { superAdminOnly } from "../../middleware/sudo.js";
    import { isAdmin } from "../../middleware/isAdmin.js";
    // import { checkIpAccess } from "../../middleware/checkip.js";
    import { checkSudoMiddleware } from "../../middleware/checkSudoMiddleware.js";


router.post('/ls1-storage', ensureAuthenticated, isAdmin, createStorage);
router.get('/ls1-1-table', ensureAuthenticated, isAdmin, ls1_1Table);
router.get('/view-ls1', ensureAuthenticated, isAdmin, getStorage);
router.get('/view-ls1/:id', ensureAuthenticated, isAdmin, ls1View);
router.get('/all-ls11', ensureAuthenticated, isAdmin, getAll_ls11);
// router.put('/ls1-storage/:id', ensureAuthenticated, isAdmin, updateStorage);
router.delete('/delete-ls11/:id', ensureAuthenticated, isAdmin, checkSudoMiddleware, deleteStorage);
router.get('/delete-ls11/:id', ensureAuthenticated, isAdmin, deleteStorage);
router.get('/edit_ls11/:id', ensureAuthenticated, isAdmin, edit);
router.patch('/edit_ls11/:id', ensureAuthenticated, isAdmin, updateStorage1);

export default router;