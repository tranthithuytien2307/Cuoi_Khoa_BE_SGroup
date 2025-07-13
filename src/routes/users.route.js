import { Router } from "express";
import userController from "../controllers/users.controllers.js";
import validateMiddleware from "../middleware/validate.middleware.js";
import veryfyMiddleware from "../middleware/veryfy.middleware.js";
const router = Router();

router.get('/users/me',veryfyMiddleware.checkUser, userController.getMe);
router.put('/users/me', validateMiddleware.authenticate, userController.updateMe);

export default router;
