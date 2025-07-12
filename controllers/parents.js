const Parent = require('../models/Parent');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

exports.createParent = async (req, res, next) => {
  const { email, password, fullName, studentId, relation, address, preferredLanguage, profilePhoto } = req.body;
  const schoolId = req.user.schoolId;

  try {
    // Create a new user entry
    let user = new User({
      email,
      password,
      role: 'parent',
      schoolId,
    });
    await user.save();

    // Create a new parent entry
    const parent = new Parent({
      userId: user._id,
      schoolId,
      fullName,
      studentId,
      relation,
      address,
      preferredLanguage,
      profilePhoto,
    });
    await parent.save();

    res.status(201).json(parent);
  } catch (err) {
    next(err);
  }
};

exports.getAllParents = async (req, res, next) => {
  try {
    const parents = await Parent.find({ schoolId: req.user.schoolId }).populate('userId', 'email').populate('studentId', 'fullName');
    res.json(parents);
  } catch (err) {
    next(err);
  }
};

exports.getParentById = async (req, res, next) => {
  try {
    const parent = await Parent.findOne({ _id: req.params.id, schoolId: req.user.schoolId }).populate('userId', 'email').populate('studentId', 'fullName');
    if (!parent) {
      return next(new ErrorResponse('Parent not found', 404));
    }
    res.json(parent);
  } catch (err) {
    next(err);
  }
};

exports.updateParent = async (req, res, next) => {
  try {
    let parent = await Parent.findOne({ _id: req.params.id, schoolId: req.user.schoolId });
    if (!parent) {
      return next(new ErrorResponse('Parent not found', 404));
    }

    parent = await Parent.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.json(parent);
  } catch (err) {
    next(err);
  }
};

exports.deleteParent = async (req, res, next) => {
  try {
    const parent = await Parent.findOne({ _id: req.params.id, schoolId: req.user.schoolId });
    if (!parent) {
      return next(new ErrorResponse('Parent not found', 404));
    }

    await User.findByIdAndDelete(parent.userId); // Delete associated user
    await Parent.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Parent removed' });
  } catch (err) {
    next(err);
  }
};