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
    editPost,
    edit,
    view,
    } from "../controllers/reception.js";

    import { getAllUsers, getUserById } from "../controllers/auth.js";
    import { ensureAuthenticated } from "../middleware/isAuth.js";

router.get('/home', ensureAuthenticated, homeRoute);
router.get('/admin-home', ensureAuthenticated, adminHomeRoute);
router.get('/viewReception', ensureAuthenticated, viewReception);
router.get('/admin-view-reception', ensureAuthenticated, adminViewReception);
router.post('/reception', createStorage);
router.get('/api/reception', getReception);
router.post('/api/admin/reception', createAdminReception);

router.get('/users', ensureAuthenticated, getAllUsers)
router.get('/api/users/:id', getUserById)

// Admin View
router.get('/view/:id', view);
router.get('/edit/:id', edit);
router.put('/edit/:id', editPost);
// router.delete('/edit/:id', deleteReception);
// router.get('/api/admin/reception', getReception);
export default router;