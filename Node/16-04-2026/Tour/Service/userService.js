const Users = require("../Model/userModel");
const { userMessage } = require("../utils/message");

class userService{
    async getUserById(id){
        const result = await Users.findById(id);
        if(result){
            return result;
        } 
        else{
            throw new Error(userMessage.NOT_FOUND);
        }
    }
    async listUser(){
        const result = await Users.find();
        if(result){
            return result;
        } 
        else{
            throw new Error(userMessage.NOT_FOUND);
        }
    }
}
module.exports = new userService()
