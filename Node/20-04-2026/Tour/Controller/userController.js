const { HttpStatus } = require("../utils/http");
const { userMessage } = require("../utils/message");
const { ErrorResponse, successResponse } = require("../utils/response");
const userService = require('../Service/userService')

class userController {
    async getUser(req, res) {
        try {
            const user = await userService.getUserById(req.user._id);
            if (!user) {
                return ErrorResponse(res, HttpStatus.NO_CONTENT, userMessage.NOT_FOUND);
            }
            return successResponse(res, HttpStatus.OK, userMessage.OK, user);
        } catch (error) {
            return ErrorResponse(res, HttpStatus.NO_CONTENT, userMessage.NOT_FOUND || error.message);
        }
    }
    async listUser(req, res) {
        try {
            const user = await userService.listUser();
            if (!user) {
                return ErrorResponse(res, HttpStatus.NO_CONTENT, userMessage.NOT_FOUND);
            }
            return successResponse(res, HttpStatus.OK, userMessage.OK, user);
        } catch (error) {
            return ErrorResponse(res, HttpStatus.NO_CONTENT, userMessage.NOT_FOUND || error.message);
        }
    }
    async updateUser(req, res) {
        try {
            const user = await userService.updateUser(req.body)
            if (!user) {
                return ErrorResponse(res, HttpStatus.NO_CONTENT, userMessage.NOT_FOUND);
            }
            return successResponse(res, HttpStatus.OK, userMessage.OK, user);
        } catch (error) {
            return ErrorResponse(res, HttpStatus.NO_CONTENT, userMessage.NOT_FOUND || error.message);
        }
    }
}
module.exports = new userController()
