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
//require middleware here
import * as validate from '../../validates/admin/song.validate';
router.get("/", controller.index);
router.get("/add",controller.add);
router.post("/add",validate.createSong,uploadFields,uploadFile,controller.addPost);
router.patch("/change-multi",controller.changeMulti);
router.get("/detail/:id",controller.detail);
router.get("/edit/:id",controller.edit);
router.patch("/edit/:id",validate.editSong,uploadFields,uploadFile,controller.editPatch);
router.patch("/deleted/:id",controller.deleted);
router.patch("/change-status/:status/:id",controller.changeStatus);
export default router;