import { Router } from "express";
const router = Router();
import * as controller from '../../controllers/admin/singer.controller'; 

import multer from "multer";
const upload = multer();
import { uploadSingle } from './../../middlewares/admin/uploadCloud.middleware';
router.get("",controller.index);
router.get("/edit/:id",controller.edit);
router.patch("/edit/:id",upload.single('avatar'),uploadSingle,controller.editPatch);
export default router;