
import { Router } from "express";
const router = Router();
import * as controller from '../../controllers/admin/roles.controllers'; 
import { checkPermission, checkPermissionApi } from './../../middlewares/admin/permission.middleware';
router.get("/",checkPermission('role_view'),controller.index);
router.get("/add",checkPermission('role_create'),controller.add);
router.post("/add",checkPermission('role_create'),controller.addPost);
router.get("/permissions",checkPermission('permission_view'),controller.permission);
router.patch("/permissions",checkPermissionApi('permission_edit'),controller.permissionPatch)
export default router;