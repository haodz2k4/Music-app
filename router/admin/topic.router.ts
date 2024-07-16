import { Router } from 'express';
const router = Router();
import * as controller from "../../controllers/admin/topic.controller";
router.get("/",controller.index);
router.patch("/change-status/:status/:id",controller.changeStatus)
router.patch("/deleted/:id",controller.deleted)


export default router;