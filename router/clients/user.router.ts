import { Router } from "express";
const router: Router = Router();
import * as controller from "../../controllers/clients/user.controller";
//require validate here
import {register,login} from '../../validates/clients/user.validate';
//require middleware here
import { requireAuth } from "../../middlewares/clients/auth.middleware";
router.get("/login",controller.login);
router.get("/register",controller.register)
router.post("/register",register,controller.registerPost);
router.post("/login",login,controller.loginPost);
router.get("/profiles",requireAuth,controller.profiles);
export default router;