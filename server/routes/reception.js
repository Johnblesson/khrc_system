import { Router } from "express";
const router = Router();

import { 
    createStorage,
    createAdminReception, 
    getStorage,
    editPost,
    deleteReception,
    searchReceptions
    } from "../controllers/reception.js";

router.post('/reception', createStorage);
router.get('/api/reception', getStorage);
router.post('/api/admin/reception', createAdminReception);
// router.get('/api/admin/reception', getReception);
export default router;