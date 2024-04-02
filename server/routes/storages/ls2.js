import { Router } from "express";
const router = Router();

import { 
    createStorage, 
    getStorage,
    findStorage,
    updateStorage,
    deleteStorage,
    ls2View,
    ls2Table,
    getAll_ls2,
    edit,
    updateStorage1,
    } from "../../controllers/storages/ls2.js";

    import { ensureAuthenticated } from "../../middleware/isAuth.js";
    // import { superAdminOnly } from "../../middleware/sudo.js";
    import { isAdmin } from "../../middleware/isAdmin.js";
    // import { checkIpAccess } from "../../middleware/checkip.js";

router.post('/ls2-storage', ensureAuthenticated, isAdmin, createStorage);
router.get('/ls2-table', ensureAuthenticated, isAdmin, ls2Table);
router.get('/all-ls2', ensureAuthenticated, isAdmin, getStorage);
router.get('/view-ls2/:id', ensureAuthenticated, isAdmin, ls2View);
router.get('/see-more-ls2', ensureAuthenticated, isAdmin, getAll_ls2); // This is the route that will be used to get all the records from the database
// router.put('/ls2-storage/:id', ensureAuthenticated, isAdmin, updateStorage);
router.delete('/delete-ls2/:id', ensureAuthenticated, isAdmin, deleteStorage);
router.get('/delete-ls2/:id', ensureAuthenticated, isAdmin, deleteStorage);
router.get('/edit_ls2/:id', ensureAuthenticated, isAdmin, edit);
router.patch('/edit_ls2/:id', ensureAuthenticated, isAdmin, updateStorage1);

export default router;