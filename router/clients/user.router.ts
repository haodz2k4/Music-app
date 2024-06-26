import { Router } from "express";
const router: Router = Router();
import multer from 'multer';
const upload = multer();
import * as controller from "../../controllers/clients/user.controller";
//require validate here
import {register,login} from '../../validates/clients/user.validate';
//require middleware here
import { requireAuth } from "../../middlewares/clients/auth.middleware";
import {uploadImg} from '../../middlewares/clients/uploadCloud.middleware';
router.get("/login",controller.login);
router.get("/register",controller.register)
router.post("/register",register,controller.registerPost);
router.post("/login",login,controller.loginPost);
router.get("/profiles",requireAuth,controller.profiles);
router.get("/edit",requireAuth,controller.edit);
router.patch("/edit",requireAuth,uploadImg,upload.single('avatar'),controller.editPatch);
export default router;