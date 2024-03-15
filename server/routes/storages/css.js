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
    import { superAdminOnly } from "../../middleware/sudo.js";
    import { isAdmin } from "../../middleware/isAdmin.js";
    import { checkIpAccess } from "../../middleware/checkip.js";

router.post('/storage', ensureAuthenticated, checkIpAccess, isAdmin, createStorage);
router.get('/css-table', ensureAuthenticated, cssTable);
router.get('/view-css', ensureAuthenticated, checkIpAccess, isAdmin, getStorage);
router.get('/view-css/:id', ensureAuthenticated, checkIpAccess, isAdmin, cssView);
router.patch('/edit_css/:id', superAdminOnly, checkIpAccess, isAdmin, updateStorage1);
router.delete('/delete-css/:id', ensureAuthenticated, superAdminOnly, checkIpAccess, isAdmin, deleteStorage);
router.get('/delete-css/:id', ensureAuthenticated, checkIpAccess, isAdmin, deleteStorage);
router.get('/all-css', ensureAuthenticated, checkIpAccess, isAdmin, getAllCss);
router.get('/edit_css/:id', ensureAuthenticated, superAdminOnly, checkIpAccess, isAdmin, edit_css);

export default router;