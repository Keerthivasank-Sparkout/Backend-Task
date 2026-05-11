const AppError = require('../utils/appError');
const {promisify} = require('util');
const catchError = require('../utils/catchError');
const jwt = require('jsonwebtoken')
const User = require('../model/userModel');

const rolePermissions = {
    user: [
        { resource: 'tour', actions: ['read'], scope: 'all' },
        { resource: 'user', actions: ['read', 'update'], scope: 'own' }
    ],
    guide: [
        { resource: 'tour', actions: ['read'], scope: 'all' },
        { resource: 'tour', actions: ['create', 'update'], scope: 'own' },
        { resource: 'user', actions: ['read', 'update'], scope: 'own' }
    ],
    'lead-guide': [
        { resource: 'tour', actions: ['read', 'create', 'update'], scope: 'all' },
        { resource: 'user', actions: ['read', 'update'], scope: 'own' }
    ],
    admin: [
        { resource: '*', actions: ['*'], scope: 'all' }
    ]
};

const getUserPermissions = (user) => [
    ...(rolePermissions[user.role] || []),
    ...(user.permissions || [])
];

const permissionMatches = (permission, resource, action) => {
    const resourceAllowed = permission.resource === '*' || permission.resource === resource;
    const actionAllowed = permission.actions.includes('*') || permission.actions.includes(action);
    return resourceAllowed && actionAllowed;
};

const idsMatch = (firstId, secondId) => firstId && secondId && firstId.toString() === secondId.toString();

exports.protect = catchError(async(req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if(!token) return next(new AppError('Not have permission, Please log in again to get access token',401));

    const decode = await promisify(jwt.verify)(token,process.env.JWT_SECRET);

    const currentUser = await User.findById(decode.id);
    if(!currentUser) return next(new AppError('The user belonging to the token, does not longer exits.'));

   if (currentUser.changePasswordAfter(decode.iat)) {
        return next(new AppError("user recently changed password! please login again..", 401));
    }
    req.user = currentUser;
    next();
})
exports.restrictTo=(...roles)=>{
    return ((req,res,next)=>{
        if(!roles.includes(req.user.role)){
            console.log(req.user.role);
            return next(new AppError('Access denied. you not have permission',403));
        }
        next()
    })
    
}

exports.authorize = (resource, action, options = {}) => catchError(async (req, res, next) => {
    const permissions = getUserPermissions(req.user).filter((permission) =>
        permissionMatches(permission, resource, action)
    );

    if (permissions.length === 0) {
        return next(new AppError('Access denied. you not have permission', 403));
    }

    if (permissions.some((permission) => permission.scope === 'all')) {
        req.permissionScope = 'all';
        return next();
    }

    if (action === 'create') {
        req.permissionScope = 'own';
        return next();
    }

    const { model, param = 'id', ownerField = 'createdBy' } = options;
    if (!model || !req.params[param]) {
        return next(new AppError('Access denied for this resource', 403));
    }

    const document = await model.findById(req.params[param]).select(`+${ownerField}`);
    if (!document) {
        return next(new AppError(`${resource} not found`, 404));
    }

    if (!idsMatch(document[ownerField], req.user._id)) {
        return next(new AppError('Access denied for this resource', 403));
    }

    req.resource = document;
    req.permissionScope = 'own';
    next();
});
