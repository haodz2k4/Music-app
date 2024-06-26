
import { Router } from 'express';
const router: Router = Router();
import * as controller from '../../controllers/clients/singer.controller';
//require validate here 
import * as validate from '../../validates/clients/singer.validate';
//require middleware here
import { requireAuthApi } from './../../middlewares/clients/auth.middleware';
router.get("/",controller.index);
router.patch("/follow/edit/:status/:id",requireAuthApi,validate.followPatch,controller.followPatch);
router.get("/detail/:slug",controller.detail);
export default router;