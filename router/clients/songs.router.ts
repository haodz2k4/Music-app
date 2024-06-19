

import { Router } from "express";
const router: Router = Router();
import * as controller from '../../controllers/clients/song.controller';
//require middleware here 
import { requireAuthApi, requireAuth } from './../../middlewares/clients/auth.middleware';
//require validate here
import { validateLike, validateFavorite, validateAddComment } from './../../validates/clients/song.validate';
router.get("/favorite",requireAuth,controller.favorite);
router.get("/:slugTopic",controller.list);
router.get("/detail/:slugSong",controller.detail);
router.patch("/like/:status/:id",requireAuthApi,validateLike,controller.like);
router.patch("/favorite/:status/:id", requireAuthApi,validateFavorite,controller.favoritePatch);
router.post("/comments/add/:id",requireAuthApi,validateAddComment,controller.addComment);
router.patch("/listens/:id",controller.listen);
export default router;