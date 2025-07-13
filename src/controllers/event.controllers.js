import eventService from "../services/event.service.js";
class eventController{
    async getAllEvents(req, res, next){
        try{
            const { page = 1, limit = 10} = req.query;
            const result = await eventService.getAllEvents(Number(page), Number(limit));
            res.status(200).json({
                success: true,
                message: 'Get all event successfully',
                data: result
            });
        } catch(err){
            next(err);
        }
    }
    async getEventById(req, res, next){
        try{
            const eventId = req.params.id;
            const result = await eventService.getEventById(eventId);
            res.status(200).json({
                success: true,
                message: 'Get Event successfully',
                data: result
            });
        } catch(err){
            next(err);
        }
    }
    async createEvent(req, res, next){
        try{
            const { title, description, location, image, startTime, endTime } = req.body;
            const creatorId = req.user.id;
            const result = await eventService.createEvent(title, description, location, image, startTime, endTime, creatorId);
            res.status(201).json({
                success: true,
                message: 'Event created',
                data: result
            });
        } catch(err){
            next(err);
        }
    }
    async updateEvent(req, res, next){
        try{
            const eventId = req.params.id;
            const { title, description, location, image, startTime, endTime} = req.body;
            const result = await eventService.updateEvent(eventId, title, description, location, image, startTime, endTime);
            res.status(200).json({
                success: true,
                message: 'Event updated',
                data: result
            });
        } catch(err){
            next(err);
        }
    }
    async deleteEvent(req, res, next){
        try{
            const eventId = req.params.id;
            const event = await eventService.deleteEvent(eventId);
            res.status(200).json({
                success: true, 
                message: 'Event deleted'
            });
        } catch(err){
            next(err);
        }
    }

    async setLockStatus(req, res, next){
        try{
            const eventId = req.params.id;
            const lockParam = req.query.lock;

            if (lockParam === undefined){
                return res.status(400).json({
                    success: false,
                    message: "Missing 'lock' query parameter"
                });
            }

            const isLocked = lockParam === 'true';
            const result = await eventService.setEventLockStatus(eventId, isLocked);
            
            if (result.modifiedCount === 0){
                return res.status(404).json({
                    success: false,
                    message: "Event not found or no change applied"
                });
            }

            res.status(200).json({
                success: true,
                message: isLocked? 'Event locked' : 'Event unlocked',
                data: result
            });
        } catch(err){
            next(err);
        }
    }
}
export default new eventController();