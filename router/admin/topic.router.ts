import { Router } from 'express';
const router = Router();
import * as controller from "../../controllers/admin/topic.controller";
router.get("/",controller.index);


export default router;