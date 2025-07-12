const Manager = require('../models/Manager');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

exports.createManager = async (req, res, next) => {
  const { email, password, fullName, designation, dob, qualification, joiningDate, profilePhoto, accessLevel } = req.body;
  const schoolId = req.user.role === 'superadmin' ? req.body.schoolId : req.user.schoolId;

  try {
    // Create a new user entry
    let user = new User({
      email,
      password,
      role: 'manager',
      schoolId,
    });
    await user.save();

    // Create a new manager entry
    const manager = new Manager({
      userId: user._id,
      schoolId,
      fullName,
      designation,
      dob,
      qualification,
      joiningDate,
      profilePhoto,
      accessLevel,
    });
    await manager.save();

    res.status(201).json(manager);
  } catch (err) {
    next(err);
  }
};

exports.getAllManagers = async (req, res, next) => {
  try {
    let query = {};
    if (req.user.role !== 'superadmin') {
      query.schoolId = req.user.schoolId;
    }
    const managers = await Manager.find(query).populate('userId', 'email');
    res.json(managers);
  } catch (err) {
    next(err);
  }
};

exports.getManagerById = async (req, res, next) => {
  try {
    let query = { _id: req.params.id };
    if (req.user.role !== 'superadmin') {
      query.schoolId = req.user.schoolId;
    }
    const manager = await Manager.findOne(query).populate('userId', 'email');
    if (!manager) {
      return next(new ErrorResponse('Manager not found', 404));
    }
    res.json(manager);
  } catch (err) {
    next(err);
  }
};

exports.updateManager = async (req, res, next) => {
  try {
    let query = { _id: req.params.id };
    if (req.user.role !== 'superadmin') {
      query.schoolId = req.user.schoolId;
    }
    let manager = await Manager.findOne(query);
    if (!manager) {
      return next(new ErrorResponse('Manager not found', 404));
    }

    manager = await Manager.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.json(manager);
  } catch (err) {
    next(err);
  }
};

exports.deleteManager = async (req, res, next) => {
  try {
    let query = { _id: req.params.id };
    if (req.user.role !== 'superadmin') {
      query.schoolId = req.user.schoolId;
    }
    const manager = await Manager.findOne(query);
    if (!manager) {
      return next(new ErrorResponse('Manager not found', 404));
    }

    await User.findByIdAndDelete(manager.userId); // Delete associated user
    await Manager.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Manager removed' });
  } catch (err) {
    next(err);
  }
};