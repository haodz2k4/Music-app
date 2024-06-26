import {Router} from 'express';
const router: Router = Router();
import * as controller from '../../controllers/admin/dashboard.controllers';
router.get("/",controller.index);

export default router;