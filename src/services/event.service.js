import eventModel from "../model/event.model.js";
class eventService{
    async getAllEvents(page = 1, limit = 10){
        try{
            const skip = (page - 1) *limit;
            const polls = await eventModel.findEvents(skip, limit);
            const total = await eventModel.countEvents();
            return {polls, total, page, limit};
        }catch(err){
            throw err;
        }
    }
    async getEventById(eventId){
        try{
            const event = await eventModel.getEventById(eventId);
            if (!event){
               throw new Error('Event not found'); 
            }
            return event;
        } catch(err){
            throw err;
        }
    }
    async createEvent(title, description, location, image, startTime, endTime, creatorId){
        try{
            const poll = await eventModel.createEvent(title, description, location, image, startTime, endTime, creatorId);
            return poll;
        } catch (err){
            throw err;
        }
    }
    async updateEvent(eventId, title, description, location, image, startTime, endTime){
        try{
            const event = await this.getEventById(eventId);
            if (event.isLocked) throw new Error('Event is locked');

            const updatedEvent = await eventModel.updateEventById(eventId, { title, description, location, image, startTime, endTime });
            return updatedEvent;
        } catch(err){
            throw err;
        }
    }

    async deleteEvent(eventId){
        try{
            const event = await this.getEventById(eventId);
            if (event.isLocked) throw new Error('Event is locked');

            return await eventModel.deleteEventById(eventId);
        }catch(err){
            throw err;
        }
    }

    async setEventLockStatus(eventId, isLocked){
        try{
            return await eventModel.updateEventById(eventId, {isLocked});
        } catch(err){
            throw err;
        }
    }

}
export default new eventService();