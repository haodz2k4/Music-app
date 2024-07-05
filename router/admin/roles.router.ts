import { Router } from "express";
const router = Router();
import * as controller from '../../controllers/admin/roles.controllers';
router.get("/",controller.index);
router.get("/add",controller.add);
router.post("/add",controller.addPost);
export default router;