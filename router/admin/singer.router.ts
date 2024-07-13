import { Router } from "express";
const router = Router();
import * as controller from '../../controllers/admin/singer.controller';
router.get("",controller.index);

export default router;