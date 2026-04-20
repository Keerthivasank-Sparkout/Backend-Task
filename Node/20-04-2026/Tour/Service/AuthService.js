const User = require("../Model/userModel");
const { setAuthCookies } = require("../utils/cookies");
const {userMessage} = require('../utils/message')
class AuthService {
    async login(res,user) {
        const exitingUser = await User.findOne({email:user.email}).select('+password');
        if(!exitingUser){
            throw new Error(userMessage.NOT_FOUND);
        }
        const isMatch = await exitingUser.comparePassword(user.password);
        if(!isMatch){
            throw new Error("invalid email or password. check credentials");
        }
        setAuthCookies(res,exitingUser._id,exitingUser.role);
        const safeUser = exitingUser.toObject();
        delete safeUser.password;
        delete safeUser.confirmPassword;
        return safeUser;

    }
    async register(payload) {
        const exitingUser = await User.findOne({email:payload.email});
        if(exitingUser){
            return new Error(userMessage.USER_ALREADY_EXISTING);
        }
        let newUser = await User.create(payload);
        newUser = newUser.toObject();
        delete newUser.password;
        delete newUser.confirmPassword;
        return newUser;

    }
}
module.exports = new AuthService()
