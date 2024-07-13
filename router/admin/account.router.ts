import { Router } from "express";
const router: Router = Router();
import * as controller from '../../controllers/admin/account.controllers';
//require validate
import * as validate from '../../validates/admin/account.validate';
//check permission
import { checkPermission, checkPermissionApi } from "../../middlewares/admin/permission.middleware";
//require middleware
import multer  from 'multer';
const upload = multer();
import {uploadSingle} from '../../middlewares/admin/uploadCloud.middleware';
router.get("/",checkPermission('account_view'),controller.index);
router.get("/add",checkPermission('account_create'),controller.add);
router.post("/add",checkPermission('account_create'),upload.single('avatar'),uploadSingle,validate.add,controller.addPost);

export default router;