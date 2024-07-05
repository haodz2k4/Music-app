import { Router } from "express";
const router = Router();
import * as controller from '../../controllers/admin/roles.controllers';
router.get("/",controller.index);

export default router;