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
    } from "../controllers/ls1-2.js";

    import { ensureAuthenticated } from "../middleware/isAuth.js";
    import { superAdminOnly } from "../middleware/sudo.js";

router.post('/ls1-2-storage', ensureAuthenticated, createStorage);
router.get('/ls1-2-table', ensureAuthenticated, ls1_2Table);
router.get('/view-ls1-2', ensureAuthenticated, getStorage);
router.get('/all-ls12', ensureAuthenticated, getAll_ls12); // This is the route that will be used to get all the records from the database
router.get('/view-ls1-2/:id', ensureAuthenticated, ls1_2_View);
router.put('/ls1-2-storage/:id', ensureAuthenticated, updateStorage);
router.delete('/ls1-2-storage/:id', ensureAuthenticated, deleteStorage);

export default router;