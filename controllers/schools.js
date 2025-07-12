const School = require('../models/School');
const ErrorResponse = require('../utils/errorResponse');

exports.registerSchool = async (req, res, next) => {
  try {
    const school = new School(req.body);
    await school.save();
    res.status(201).json(school);
  } catch (err) {
    next(err);
  }
};

exports.getSchoolDetails = async (req, res, next) => {
  try {
    const school = await School.findById(req.params.id);
    if (!school) {
      return next(new ErrorResponse('School not found', 404));
    }
    res.json(school);
  } catch (err) {
    next(err);
  }
};

exports.updateSchoolDetails = async (req, res, next) => {
  try {
    let school = await School.findById(req.params.id);
    if (!school) {
      return next(new ErrorResponse('School not found', 404));
    }

    school = await School.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.json(school);
  } catch (err) {
    next(err);
  }
};

exports.deleteSchool = async (req, res, next) => {
  try {
    const school = await School.findById(req.params.id);
    if (!school) {
      return next(new ErrorResponse('School not found', 404));
    }

    await School.findByIdAndDelete(req.params.id);
    res.json({ msg: 'School removed' });
  } catch (err) {
    next(err);
  }
};