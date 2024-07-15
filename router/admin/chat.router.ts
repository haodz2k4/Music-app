import { Router } from "express";
const router: Router = Router();
import * as controller from '../../controllers/admin/chat.controllers';
router.get("/",controller.index)

export default router;