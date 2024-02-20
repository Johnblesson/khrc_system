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
    } from "../controllers/css.js";

    import { ensureAuthenticated } from "../middleware/isAuth.js";

router.post('/storage', createStorage);
router.get('/css-table', ensureAuthenticated, cssTable);
router.get('/view-css', ensureAuthenticated, getStorage);
router.get('/view-css/:id',ensureAuthenticated, cssView);
router.put('/storage/:id', ensureAuthenticated, updateStorage);
router.delete('/storage/:id', ensureAuthenticated, deleteStorage);

export default router;