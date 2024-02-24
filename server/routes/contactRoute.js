import { Router } from "express";
const router = Router();

import { 
    createMessage, 
    getAllContactForms,
    messagesRoute,
    messageView
    } from "../controllers/contactController.js";
import { ensureAuthenticated } from "../middleware/isAuth.js";    

router.post('/contact', ensureAuthenticated, createMessage);
router.get('/message', ensureAuthenticated, messagesRoute);
router.get('/get-all-contact', ensureAuthenticated, getAllContactForms);
router.get('/view-message/:id', ensureAuthenticated, messageView)

export default router;