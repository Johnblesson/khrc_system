import { Router } from "express";
const router = Router();

import { 
    createMessage, 
    getAllContactForms,
    messagesRoute
    } from "../controllers/contactController.js";

router.post('/contact', createMessage);
router.get('/message', messagesRoute);
router.get('/get-all-contact', getAllContactForms);

export default router;