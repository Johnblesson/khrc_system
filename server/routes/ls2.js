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
    } from "../controllers/ls2.js";

    import { ensureAuthenticated } from "../middleware/isAuth.js";
    import { superAdminOnly } from "../middleware/sudo.js";

router.post('/ls2-storage', ensureAuthenticated, createStorage);
router.get('/ls2-table', ensureAuthenticated, ls2Table);
router.get('/all-ls2', ensureAuthenticated, getStorage);
router.get('/view-ls2/:id', ensureAuthenticated, ls2View);
router.get('/see-more-ls2', ensureAuthenticated, getAll_ls2); // This is the route that will be used to get all the records from the database
router.put('/ls2-storage/:id', ensureAuthenticated, updateStorage);
router.delete('/ls2-storage/:id', ensureAuthenticated, deleteStorage);
router.get('/edit_ls2/:id', ensureAuthenticated, superAdminOnly, edit);
router.patch('/edit_ls2/:id', updateStorage1);

export default router;