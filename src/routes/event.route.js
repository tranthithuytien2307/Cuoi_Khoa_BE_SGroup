import { Router } from "express";
import eventControllers from "../controllers/event.controllers.js";
import validateMiddleware from "../middleware/validate.middleware.js";

const router = Router();

router.get('/events',eventControllers.getAllEvents);
router.get('/events/:id', eventControllers.getEventById);
router.post('/events', validateMiddleware.authenticate, validateMiddleware.isAdmin,eventControllers.createEvent);
router.put('/events/:id', validateMiddleware.authenticate, validateMiddleware.isAdmin, validateMiddleware.validateId, eventControllers.updateEvent);
router.delete('/events/:id', validateMiddleware.authenticate, validateMiddleware.isAdmin, validateMiddleware.validateId, eventControllers.deleteEvent);
router.put('/events/:id', validateMiddleware.authenticate, validateMiddleware.isAdmin, validateMiddleware.validateId, eventControllers.setLockStatus);


export default router;