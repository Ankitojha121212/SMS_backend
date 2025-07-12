const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');

exports.register = async (req, res, next) => {
  const { email, password, role, schoolId } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return next(new ErrorResponse('User already exists', 400));
    }

    user = new User({
      email,
      password,
      role,
      schoolId,
    });

    await user.save();

    const payload = {
      user: {
        id: user.id,
        role: user.role,
        schoolId: user.schoolId,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorResponse('Invalid credentials', 400));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(new ErrorResponse('Invalid credentials', 400));
    }

    const payload = {
      user: {
        id: user.id,
        role: user.role,
        schoolId: user.schoolId,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    next(err);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    next(err);
  }
};