import { Router } from "express";
const router = Router();

import { 
    createStorage, 
    getStorage,
    findStorage,
    updateStorage,
    deleteStorage,
    ls1_2_View,
    ls1_2Table,
    getAll_ls12,
    edit,
    updateStorage1,
    } from "../../controllers/storages/ls1-2.js";

    import { ensureAuthenticated } from "../../middleware/isAuth.js";
    // import { superAdminOnly } from "../../middleware/sudo.js";
    import { isAdmin } from "../../middleware/isAdmin.js";
    // import { checkIpAccess } from "../../middleware/checkip.js";
    import { checkSudoMiddleware } from "../../middleware/checkSudoMiddleware.js";


router.post('/ls1-2-storage', ensureAuthenticated, isAdmin, createStorage);
router.get('/ls1-2-table', ensureAuthenticated, isAdmin, ls1_2Table);
router.get('/view-ls1-2', ensureAuthenticated, isAdmin, getStorage);
router.get('/all-ls12', ensureAuthenticated, isAdmin, getAll_ls12); // This is the route that will be used to get all the records from the database
router.get('/view-ls1-2/:id', ensureAuthenticated, isAdmin, ls1_2_View);
// router.put('/ls1-2-storage/:id', ensureAuthenticated, updateStorage);
router.delete('/delete-ls12/:id', ensureAuthenticated, isAdmin, checkSudoMiddleware, deleteStorage);
router.get('/delete-ls12/:id', ensureAuthenticated, isAdmin, deleteStorage);
router.get('/edit_ls12/:id', ensureAuthenticated, isAdmin, edit);
router.patch('/edit_ls12/:id', ensureAuthenticated, isAdmin, updateStorage1);

export default router;