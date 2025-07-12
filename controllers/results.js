const Result = require('../models/Result');
const ErrorResponse = require('../utils/errorResponse');

exports.addResult = async (req, res, next) => {
  const { examId, studentId, marksObtained, grade } = req.body;
  const schoolId = req.user.schoolId;

  try {
    const result = new Result({
      examId,
      studentId,
      schoolId,
      marksObtained,
      grade,
    });

    await result.save();
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.getResultsByStudent = async (req, res, next) => {
  try {
    const results = await Result.find({
      studentId: req.params.studentId,
      schoolId: req.user.schoolId,
    }).populate('examId', 'title subject class').populate('studentId', 'fullName');

    res.json(results);
  } catch (err) {
    next(err);
  }
};

exports.getResultsByExam = async (req, res, next) => {
  try {
    const results = await Result.find({
      examId: req.params.examId,
      schoolId: req.user.schoolId,
    }).populate('studentId', 'fullName');

    res.json(results);
  } catch (err) {
    next(err);
  }
};

exports.updateResult = async (req, res, next) => {
  try {
    let result = await Result.findById(req.params.id);

    if (!result) {
      return next(new ErrorResponse('Result record not found', 404));
    }

    // Ensure the record belongs to the user's school
    if (result.schoolId.toString() !== req.user.schoolId) {
      return next(new ErrorResponse('Not authorized to update this record', 401));
    }

    result = await Result.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.deleteResult = async (req, res, next) => {
  try {
    const result = await Result.findById(req.params.id);

    if (!result) {
      return next(new ErrorResponse('Result record not found', 404));
    }

    // Ensure the record belongs to the user's school
    if (result.schoolId.toString() !== req.user.schoolId) {
      return next(new ErrorResponse('Not authorized to delete this record', 401));
    }

    await Result.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Result removed' });
  } catch (err) {
    next(err);
  }
};