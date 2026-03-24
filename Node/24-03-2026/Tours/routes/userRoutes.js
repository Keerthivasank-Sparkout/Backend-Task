const express = require('express')
const {getUser,getAllUsers,createUser,updateUser,deleteUser} = require('../controller/userController');


const UserRouter = express.Router();

UserRouter
        .route('/')
        .get(getAllUsers)
        .post(createUser);
UserRouter
        .route('/:id')
        .get(getUser)
        .patch(updateUser)
        .delete(deleteUser);

module.exports =UserRouter;