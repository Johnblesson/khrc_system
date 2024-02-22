import { Router } from "express";
const router = Router();

import { 
    exportStorageToExcel
    } from "../controllers/xlsx.js";

router.get('/export-storage-to-excel', exportStorageToExcel);

export default router;