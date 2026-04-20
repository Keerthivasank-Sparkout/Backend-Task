const User = require("../Model/userModel");
const {userMessage} = require('../utils/message')
class AuthService {
    async login(user) {
        const result = await User.findOne({ email: user.email }).select('+password');
        if (!result) {
            throw new Error(userMessage.NOT_FOUND)
        }
        const isMatch = await result.comparePassword(user.password);
        if(isMatch){
            const sanitizedUser = result.toObject();
            delete sanitizedUser.password;
            return sanitizedUser;
        }
        else{
            throw new Error(userMessage.INVALID);
        }

    }
    async register(payload) {
        const existingUser = await User.findOne({ email: payload.email });
        if (existingUser) {
            throw new Error(userMessage.USER_ALREADY_EXISTING);
        } 
        if(payload.password !== payload.confirmPassword){
            throw new Error(userMessage.CONFIRM_PASSWORD_WORNG);
        }
        let result = await User.create(payload);
        result = result.toObject();
        delete result.password;

        return result;
    }
}
module.exports = new AuthService()
