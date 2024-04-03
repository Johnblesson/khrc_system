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
import { checkSudoMiddleware } from "../../middleware/checkSudoMiddleware.js";
// import { checkIpAccess } from "../middleware/checkip.js";   
// import { superAdminOnly } from "../middleware/sudo.js";

router.post('/contact', ensureAuthenticated, createMessage);
router.get('/message', ensureAuthenticated, isAdmin, messagesRoute);
router.get('/get-all-contact', ensureAuthenticated, isAdmin, getAllContactForms);
router.get('/view-message/:id', ensureAuthenticated, isAdmin, messageView)

router.delete('/delete-message/:id',  ensureAuthenticated, isAdmin, checkSudoMiddleware, deleteMessage);
router.get('/delete-message/:id',  ensureAuthenticated, isAdmin, deleteMessage);

export default router;