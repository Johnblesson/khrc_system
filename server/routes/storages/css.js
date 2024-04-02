import { Router } from "express";
const router = Router();

import { 
    createStorage, 
    getStorage,
    findStorage,
    deleteStorage,
    cssView,
    cssTable,
    getAllCss,
    edit_css,
    updateStorage1,
    } from "../../controllers/storages/css.js";

    import { ensureAuthenticated } from "../../middleware/isAuth.js"; 
    // import { superAdminOnly } from "../../middleware/sudo.js";
    import { isAdmin } from "../../middleware/isAdmin.js";
    import { checkIpAccess } from "../../middleware/checkip.js";

router.post('/storage', ensureAuthenticated, isAdmin, createStorage);
router.get('/css-table', ensureAuthenticated, cssTable);
router.get('/view-css', ensureAuthenticated, isAdmin, getStorage);
router.get('/view-css/:id', ensureAuthenticated, isAdmin, cssView);
router.patch('/edit_css/:id', isAdmin, updateStorage1);
router.delete('/delete-css/:id', ensureAuthenticated, isAdmin, deleteStorage);
router.get('/delete-css/:id', ensureAuthenticated, isAdmin, deleteStorage);
router.get('/all-css', ensureAuthenticated, isAdmin, getAllCss);
router.get('/edit_css/:id', ensureAuthenticated, isAdmin, edit_css);

export default router;