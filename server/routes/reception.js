import { Router } from "express";
const router = Router();

import { 
    createStorage,
    createAdminReception, 
    // getStorage,
    homeRoute,
    adminHomeRoute,
    getReception,
    viewReception,
    adminViewReception,
    // searchReceptions,
    deleteRecord,
    // editPost,
    edit,
    view,
    getAllReception,
    updateAdminReception,
    } from "../controllers/reception.js";

    import { getAllUsers, getUserById } from "../controllers/auth.js";
    import { ensureAuthenticated } from "../middleware/isAuth.js";
    import { superAdminOnly } from "../middleware/sudo.js";
    import { checkIpAccess } from "../middleware/checkip.js";
    import { isAdmin } from "../middleware/isAdmin.js";

router.get('/home', ensureAuthenticated, checkIpAccess, homeRoute);
router.get('/admin-home', ensureAuthenticated, checkIpAccess, adminHomeRoute );
router.get('/viewReception', ensureAuthenticated, checkIpAccess, viewReception);
router.get('/admin-view-reception', ensureAuthenticated, checkIpAccess, adminViewReception);
router.post('/reception', ensureAuthenticated, checkIpAccess, createStorage);
router.get('/api/reception', ensureAuthenticated, checkIpAccess, getReception);
router.post('/api/admin/reception', ensureAuthenticated, checkIpAccess, createAdminReception);

router.get('/users', ensureAuthenticated, checkIpAccess, getAllUsers)
router.get('/api/users/:id', ensureAuthenticated, checkIpAccess, getUserById)
router.get('/all-reception', ensureAuthenticated, checkIpAccess, getAllReception)

// router.post('/search', searchReceptions);

// Admin View
router.get('/view/:id', ensureAuthenticated, checkIpAccess, view);
router.get('/reception_edit/:id', ensureAuthenticated, isAdmin, checkIpAccess, edit);
router.patch('/edit/:id', ensureAuthenticated, checkIpAccess, isAdmin, updateAdminReception);
router.delete('/delete-reception/:id', ensureAuthenticated, checkIpAccess, isAdmin, deleteRecord);
router.get('/delete-reception/:id', ensureAuthenticated, checkIpAccess, isAdmin, deleteRecord);
// router.delete('/edit/:id', deleteReception);
// router.get('/api/admin/reception', getReception);

export default router;