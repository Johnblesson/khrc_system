import { Router } from "express";
const router = Router();

import { 
    createStorage, 
    getStorage,
    findStorage,
    updateStorage,
    deleteStorage,
    cssView,
    cssTable,
    getAllCss,
    edit,
    } from "../controllers/css.js";

    import { ensureAuthenticated } from "../middleware/isAuth.js"; 
    import { superAdminOnly } from "../middleware/sudo.js";

router.post('/storage', ensureAuthenticated, createStorage);
router.get('/css-table', ensureAuthenticated, cssTable);
router.get('/view-css', ensureAuthenticated, getStorage);
router.get('/view-css/:id',ensureAuthenticated, cssView);
router.put('/storage/:id', ensureAuthenticated, updateStorage);
router.delete('/storage/:id', ensureAuthenticated, deleteStorage);
router.get('/all-css', ensureAuthenticated, getAllCss);
router.get('/edit/:id', edit);

export default router;