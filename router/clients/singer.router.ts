import { Router } from 'express';
const router: Router = Router();
import * as controller from '../../controllers/clients/singer.controller';
router.get("/",controller.index);


export default router;