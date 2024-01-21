import { Router } from "express";
const router = Router();

import { 
    createMessage, 
    getAllContactForms 
    } from "../controllers/contactController.js";

router.post('/contact', createMessage);
router.get('/get-all-contact', getAllContactForms);

export default router;