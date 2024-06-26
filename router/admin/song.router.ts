import { Router } from "express";
const router: Router = Router();
import * as controller from '../../controllers/admin/song.controller';

import multer from 'multer';
const upload = multer();
import { uploadFile } from "../../middlewares/admin/uploadCloud.middleware";
const uploadFields = upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'audio', maxCount: 1 }
  ]);
router.get("/", controller.index);
router.get("/add",controller.add);
router.post("/add",uploadFields,uploadFile,controller.addPost)
export default router;