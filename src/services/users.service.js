import usersModule from "../model/users.model.js";
import userProvides from "../providers/user.provides.js";
import hashProvides from "../providers/hash.provides.js";
import emailProvider from "../providers/email.provides.js";
import bcrypt from "bcryptjs";
class UserService {
    
    async getMe(id){
        const user = await usersModule.getUserById(id);
        if (!user){
            throw new Error('User not found');
        }
        const result = {
            username: user.name,
            id: user._id,
            email: user.email,
            role: user.role
        }
        return result;
    }
    
    async putUser(name, id) {
        try {
            console.log("ten", name);
            console.log("id", id);
            const user = await usersModule.putUser(name, id);
            if (!user) {
                console.error("Không tìm thấy user với ID:", id);
                throw new Error('User not found');
            }
            return user;
        } catch (err) {
            throw err;
        }
    }
}

export default new UserService();
