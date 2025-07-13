import usersService from '../services/users.service.js';
import UserService from '../services/users.service.js';

class UserController {

    async getMe(req, res, next){
        try{
            const userId = req.user;
            const user = await usersService.getMe(userId);
            res.status(200).json({
                success: true,
                data: user
            });
        } catch(err){
            next(err)
        }
    }

    async updateMe(req, res, next){
        try{
            const id = req.user.id;
            const { name } = req.body;

            if (!id || typeof id !== 'string' || id.trim() === '') {
                return res.status(400).json({ success: false, message: 'Invalid ID' });
            }

            if (!name || typeof name !== 'string' || name.trim() === '') {
                return res.status(400).json({ success: false, message: 'Invalid name' });
            }

            const updatedUser = await UserService.putUser(name, id);

            return res.status(200).json({
                success: true,
                data: updatedUser
            });
        }catch(err){
            next(err);
        }
    }
}

export default new UserController();
