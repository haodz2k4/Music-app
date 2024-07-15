import { Router } from "express";
const router: Router = Router();
import * as controller from '../../controllers/admin/chat.controllers';
//require middleware here
import chatSocket from '../../socket/admin/chat.socket';
router.get("/",chatSocket,controller.index)

export default router;