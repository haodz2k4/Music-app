
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
import { checkPermission, checkPermissionApi } from './../../middlewares/admin/permission.middleware';
//require middleware here
import * as validate from '../../validates/admin/song.validate';
router.get("/",checkPermission('song_view'),controller.index);
router.get("/add",checkPermission('song_create'),controller.add);
router.post("/add",checkPermission('song_create'),uploadFields,uploadFile,validate.createSong,controller.addPost);
router.patch("/change-multi",checkPermission('song_edit'),controller.changeMulti);
router.get("/detail/:id",checkPermission('song_view'),controller.detail);
router.get("/edit/:id",checkPermission('song_edit'),controller.edit);
router.patch("/edit/:id",checkPermission('song_edit'),validate.editSong,uploadFields,uploadFile,controller.editPatch);
router.patch("/deleted/:id",checkPermissionApi('song_delete'),controller.deleted);
router.patch("/change-status/:status/:id",checkPermissionApi('song_edit'),controller.changeStatus);
export default router;