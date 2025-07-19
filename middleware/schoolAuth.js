const jwt = require('jsonwebtoken');
const School = require('../models/School');
const ErrorResponse = require('../utils/errorResponse');

exports.protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new ErrorResponse('Not authorized to access this route', 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await School.findById(decoded.id);

        next();
    } catch (err) {
        return next(new ErrorResponse('Not authorized to access this route', 401));
    }
};

exports.schoolAdmin = (req, res, next) => {
    if (req.user.role !== 'schoolAdmin') {
        return next(new ErrorResponse('User is not a school admin', 401));
    }
    next();
};