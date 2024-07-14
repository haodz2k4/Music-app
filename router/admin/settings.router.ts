
import { Router } from "express";
const router: Router = Router();
import * as controller from '../../controllers/admin/setting-general.controller';

import multer from 'multer';
const upload = multer();
//require middleware
import { uploadSingle } from './../../middlewares/admin/uploadCloud.middleware';
import * as validate from '../../validates/admin/settings.validate';
router.get("/general",controller.general);
router.patch("/general",upload.single('logo'),uploadSingle,validate.generalPatch,controller.generalPatch);
export default router;