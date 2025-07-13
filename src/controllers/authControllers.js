import AuthService from "../services/auth.service.js";

class AuthController{
    async Register(req, res, next) {
        try {
            const { username, email, password, role } = req.body;

            if (!username || typeof username !== 'string' || username.trim() === '') {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid name'
                });
            }

            await AuthService.Register(username, password, email, role);
            res.status(200).json({
                success: true,
                message: 'Create a user success'
            });
        } catch (err) {
            res.status(400).json({
                success: false,
                message: err.message
            });
        }
    }

    async Login(req, res, next){
        try{
            const {email, password} = req.body;
            const token = await AuthService.Login(email, password);
            res.status(200).json({
                success: true,
                token: token,
                message: 'Login success'
            });
        } catch(err){
            next(err);
        }
    }

    async forgotPassword(req, res, next){
        try{
            const {email} = req.body;
            const check = await AuthService.forgotPassword(email);

            if (check){
                return res.status(200).json({
                    success: true,
                    message: 'Reset password email sent successfully'
                });
            }
        } catch(err){
            next(err);
        }
    }
    
    async resetPassword(req, res, next){
        try{
            const {email, passwordResetToken, newPassword} = req.body;

            const check = await AuthService.resetPassword(email, passwordResetToken, newPassword);

            if (check) {
                return res.status(200).json({
                    success: true,
                    message: 'Reset password successfully'
                });
            }
        } catch (err){
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }
    }
    async createUser(req, res, next) {
        try {
            const { username, password, email, role } = req.body;
            console.log("BODY", req.body);
            if (!username || typeof username !== 'string' || username.trim() === '') {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid name'
                });
            }

            await AuthService.createUser(username, password, email, role);
            res.status(200).json({
                success: true,
                message: 'Create a user success'
            });
        } catch (err) {
            next(err);
        }
    }
    async getAllUsers(req, res, next) {
        try {
            const users = await AuthService.getAllUsers();
            res.status(200).json({
                success: true,
                data: users
            });
        } catch (err) {
            next(err);
        }
    }
    async deleteUser(req, res, next) {
        try {
            const { id } = req.params;

            if (!id || typeof id !== 'string' || id.trim() === '') {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid ID'
                });
            }

            const deletedUser = await AuthService.deleteUser(id);
            res.status(200).json({
                success: true,
                data: deletedUser
            });
        } catch (err) {
            next(err);
        }
    }
}
export default new AuthController();
