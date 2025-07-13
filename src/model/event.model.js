
import { ObjectId } from "mongodb";
import { getDB } from "../config/db.config.js";

class eventModel {
    async findEvents(skip, limit) {
        try {
            return await getDB().collection('event').find().skip(skip).limit(limit).toArray();
        } catch (err) {
            throw err;
        }
    }

    async countEvents() {
        try {
            return await getDB().collection('event').countDocuments();
        } catch (err) {
            throw err;
        }
    }

    async getEventById(eventId){
        try {
            return await getDB().collection('event').findOne({ _id: new ObjectId(eventId) });
        } catch (err) {
            throw err;
        }
    }

    async createEvent(title, description, location, image, startTime, endTime, creatorId) {
        try {
            
            const event = await getDB().collection('event').insertOne({
                title: title,
                description: description,
                location: location,
                image: image,
                startTime: startTime,
                endTime: endTime,
                creatorId: creatorId,
                isLocked: false,
                createdAt: new Date(),
                updateAt: new Date()
            });
            return event.insertedId;
        } catch (err) {
            throw err;
        }
    }

    async updateEventById(eventId, data) {
        try {
            return await getDB().collection('event').updateOne(
                { _id: new ObjectId(eventId) },
                { $set: data }
            );
        } catch (err) {
            throw err;
        }
    }

    async deleteEventById(eventId) {
        try {
            return await getDB().collection('event').deleteOne({ _id: new ObjectId(eventId) });
        } catch (err) {
            throw err;
        }
    }

}

export default new eventModel();
