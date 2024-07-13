import { Router } from "express";
const router = Router();
import * as controller from '../../controllers/admin/auth.controllers';
router.get("/login",controller.login);
router.post("/login",controller.loginPost);
export default router;