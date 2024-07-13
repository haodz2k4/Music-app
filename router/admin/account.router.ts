import { Router } from "express";
const router: Router = Router();
import * as controller from '../../controllers/admin/account.controllers';
//require validate
import * as validate from '../../validates/admin/account.validate';
//require middleware
import multer  from 'multer';
const upload = multer();
import {uploadSingle} from '../../middlewares/admin/uploadCloud.middleware';
router.get("/",controller.index);
router.get("/add",controller.add);
router.post("/add",upload.single('avatar'),uploadSingle,validate.add,controller.addPost);

export default router;