const AuthService = require('../Service/AuthService.js');
const {HttpStatus} = require('../utils/http.js');
const {userMessage} = require('../utils/message.js');
const { successResponse,ErrorResponse } = require('../utils/response.js');
const { signToken } = require('../utils/jwt.js');

class AuthContoller {
    async login(req, res) {
        try {
            const user = req.body;
            const result = await AuthService.login(user);

            // Session-based version:
            // req.session.regenerate((error) => {
            //     if (error) {
            //         return ErrorResponse(res,HttpStatus.INTERNAL_SERVER_ERROR,userMessage.FAILED,error);
            //     }
            //
            //     req.session.userId = result._id;
            //     req.session.isAuthenticated = true;
            //
            //     return successResponse(res,HttpStatus.OK,userMessage.LOGIN,result);
            // });

            const token = signToken({
                id: result._id,
                email: result.email,
                role: result.role
            });

            return successResponse(res,HttpStatus.OK,userMessage.LOGIN,{
                token,
                user: result
            });
        }catch(error){
            return ErrorResponse(res,HttpStatus.BAD_REQUEST,error.message || userMessage.INVALID,error)
        }
    }
    async register(req,res){
        try{
            const result = await AuthService.register(req.body);
            if(!result){
                return ErrorResponse(res,HttpStatus.BAD_REQUEST,userMessage.FAILED) 
            }
            return successResponse(res,HttpStatus.OK,userMessage.CREATED,result);
        }catch(error){
            console.log(error)
            return ErrorResponse(res,HttpStatus.BAD_REQUEST,userMessage.FAILED,error)
        }
    }
    async logout(req,res){
        try {
            // Session-based version:
            // if(!req.session){
            //     return successResponse(res,HttpStatus.OK,userMessage.LOGOUT);
            // }
            //
            // req.session.destroy((error) => {
            //     if (error) {
            //         return ErrorResponse(res,HttpStatus.INTERNAL_SERVER_ERROR,userMessage.FAILED,error);
            //     }
            //
            //     res.clearCookie('connect.sid');
            //     return successResponse(res,HttpStatus.OK,userMessage.LOGOUT);
            // });

            return successResponse(res,HttpStatus.OK,userMessage.LOGOUT);
        } catch (error) {
            return ErrorResponse(res,HttpStatus.INTERNAL_SERVER_ERROR,userMessage.FAILED,error)
        }
    }
}
module.exports = new AuthContoller();
