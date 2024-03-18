import { Router } from "express";
const router = Router();

import { 
    createMessage, 
    getAllContactForms,
    messagesRoute,
    messageView,
    deleteMessage
    } from "../controllers/contactController.js";
import { ensureAuthenticated } from "../middleware/isAuth.js"; 
import { isAdmin } from "../middleware/isAdmin.js";
import { checkIpAccess } from "../middleware/checkip.js";   
import { superAdminOnly } from "../middleware/sudo.js";

router.post('/contact', ensureAuthenticated, createMessage);
router.get('/message', ensureAuthenticated, checkIpAccess, isAdmin, messagesRoute);
router.get('/get-all-contact', ensureAuthenticated, checkIpAccess, isAdmin, getAllContactForms);
router.get('/view-message/:id', ensureAuthenticated, checkIpAccess, isAdmin, messageView)

router.delete('/delete-message/:id',  ensureAuthenticated, checkIpAccess, isAdmin, superAdminOnly, deleteMessage);
router.get('/delete-message/:id',  ensureAuthenticated, checkIpAccess, isAdmin, deleteMessage);

export default router;