import { Router } from "express";
const router:Router = Router();
import * as controller from '../../controllers/clients/search.controller';
router.get("/result",controller.result);
router.get("/suggestion",controller.suggestion);

export default router;