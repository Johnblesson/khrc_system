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
    // import { superAdminOnly } from "../middleware/sudo.js";
    // import { checkIpAccess } from "../middleware/checkip.js";
    import { isAdmin } from "../middleware/isAdmin.js";

router.get('/home', ensureAuthenticated, homeRoute);
router.get('/admin-home', ensureAuthenticated, adminHomeRoute );
router.get('/viewReception', ensureAuthenticated, viewReception);
router.get('/admin-view-reception', ensureAuthenticated, adminViewReception);
router.post('/reception', ensureAuthenticated, createStorage);
router.get('/api/reception', ensureAuthenticated, getReception);
router.post('/api/admin/reception', ensureAuthenticated, createAdminReception);

router.get('/users', ensureAuthenticated, getAllUsers)
router.get('/api/users/:id', ensureAuthenticated, getUserById)
router.get('/all-reception', ensureAuthenticated, getAllReception)

// router.post('/search', searchReceptions);

// Admin View
router.get('/view/:id', ensureAuthenticated, view);
router.get('/reception_edit/:id', ensureAuthenticated, isAdmin, edit);
router.patch('/edit/:id', ensureAuthenticated, isAdmin, updateAdminReception);
router.delete('/delete-reception/:id', ensureAuthenticated, isAdmin, deleteRecord);
router.get('/delete-reception/:id', ensureAuthenticated, isAdmin, deleteRecord);
// router.delete('/edit/:id', deleteReception);
// router.get('/api/admin/reception', getReception);

export default router;