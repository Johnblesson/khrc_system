import { Router } from "express";
const router = Router();

import { 
    createMessage, 
    getAllContactForms,
    messagesRoute,
    messageView
    } from "../controllers/contactController.js";
import { ensureAuthenticated } from "../middleware/isAuth.js"; 
import { isAdmin } from "../middleware/isAdmin.js";
import { checkIpAccess } from "../middleware/checkip.js";   

router.post('/contact', ensureAuthenticated, createMessage);
router.get('/message', ensureAuthenticated, checkIpAccess, isAdmin, messagesRoute);
router.get('/get-all-contact', ensureAuthenticated, checkIpAccess, isAdmin, getAllContactForms);
router.get('/view-message/:id', ensureAuthenticated, checkIpAccess, isAdmin, messageView)

export default router;