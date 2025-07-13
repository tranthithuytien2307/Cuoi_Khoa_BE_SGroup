import usersModule from "../model/users.model.js";
import userProvides from "../providers/user.provides.js";
import hashProvides from "../providers/hash.provides.js";
import emailProvider from "../providers/email.provides.js";
import bcrypt from "bcryptjs";

class AuthService {
    async Register(name, password, email, role ) {
        try {
            const { hashString } = await hashProvides.generateHash(password);
            const user = await usersModule.Register(name, hashString, email, role); // 👈 truyền role
            return user;
        } catch (err) {
            throw err;
        }
    }

    async Login(email, password){
        try{
            const user = await usersModule.getUserByEmail(email);
            console.log(user.password);
            
            if (!user){
                throw new Error('User not found');
            }
            const check = await hashProvides.compareHash(password, user.password);
            
            if (check){
                const token = await userProvides.encodeToken(user);
                return token;
            } else {
                throw new Error('Login unsuccess');
            }
        } catch(err){
            throw err;
        }
    }

    async forgotPassword(email){
        try{
            const user = await usersModule.getUserByEmail(email);

            if (!user){
                throw new Error('Email not found');
            }

            const resetPasswordToken = await bcrypt.genSalt(10);
            const resetPasswordExpiration = new Date(Date.now() + 10 *60 * 1000 );
            const result = await usersModule.setResetPasswordToken(email, resetPasswordToken, resetPasswordExpiration);

            if (!result){
                throw new Error('Can not reset password');
            }
            emailProvider.sendEmail({
                emailFrom: process.env.SMTP_USER,
                emailTo: email,
                emailSubject: 'Reset password',
                emailText: 
                'Here is your reset password token: ' + resetPasswordToken
            });
            return true;
        } catch(err){
            throw err;
        }
    }
    async resetPassword(email, resetPasswordToken, newPassword){
        try{
            const user = await usersModule.checkResetPassword(email, resetPasswordToken);

            if (!user){
                throw new Error('Invalid token or token has expired');
            }
            console.log(newPassword);
            const { hashString } = await hashProvides.generateHash(newPassword);
            const updateStatus = await usersModule.resetPassword(hashString, email);

            if (!updateStatus){
                throw new Error('Reset password fail');
            }
            return true;
        } catch(err){
            throw err;
        }
    }
    async createUser(name, password, email,role ='user'){
        try{
            const { hashString } = await hashProvides.generateHash(password);
            const user = await usersModule.createUser(name, hashString, email, role);
            return user;
        } catch(err){
            throw err;
        }
    }
    async getAllUsers(){
        try{
            return await usersModule.getAllUsers();
        } catch(err){
            throw err;
        }
    }
    async deleteUser(id) {
        try {
            const user = await usersModule.deleteUser(id);
            if (!user.value) {
                throw new Error('User not found');
            }
            return user.value;
        } catch (err) {
            throw err;
        }
    }
}
export default new AuthService();