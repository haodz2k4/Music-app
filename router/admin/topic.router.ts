import { Router } from 'express';
const router = Router();
import * as controller from "../../controllers/admin/topic.controller";
router.get("/",controller.index);

router.patch("/deleted/:id",controller.deleted)


export default router;