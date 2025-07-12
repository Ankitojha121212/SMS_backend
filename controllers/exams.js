
const Exam = require('../models/Exam');
const ErrorResponse = require('../utils/errorResponse');

exports.createExam = async (req, res, next) => {
  const { title, subject, class: examClass, date, maxMarks, teacherId } = req.body;
  const schoolId = req.user.schoolId;

  try {
    const exam = new Exam({
      schoolId,
      title,
      subject,
      class: examClass,
      date,
      maxMarks,
      teacherId,
    });

    await exam.save();
    res.status(201).json(exam);
  } catch (err) {
    next(err);
  }
};

exports.getExamsByClass = async (req, res, next) => {
  try {
    const exams = await Exam.find({
      class: req.params.class,
      schoolId: req.user.schoolId,
    }).populate('teacherId', 'fullName');

    res.json(exams);
  } catch (err) {
    next(err);
  }
};

exports.getExamById = async (req, res, next) => {
  try {
    const exam = await Exam.findOne({ _id: req.params.id, schoolId: req.user.schoolId }).populate('teacherId', 'fullName');
    if (!exam) {
      return next(new ErrorResponse('Exam not found', 404));
    }
    res.json(exam);
  } catch (err) {
    next(err);
  }
};

exports.updateExam = async (req, res, next) => {
  try {
    let exam = await Exam.findById(req.params.id);

    if (!exam) {
      return next(new ErrorResponse('Exam not found', 404));
    }

    // Ensure the record belongs to the user's school
    if (exam.schoolId.toString() !== req.user.schoolId) {
      return next(new ErrorResponse('Not authorized to update this record', 401));
    }

    exam = await Exam.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

    res.json(exam);
  } catch (err) {
    next(err);
  }
};

exports.deleteExam = async (req, res, next) => {
  try {
    const exam = await Exam.findById(req.params.id);

    if (!exam) {
      return next(new ErrorResponse('Exam not found', 404));
    }

    // Ensure the record belongs to the user's school
    if (exam.schoolId.toString() !== req.user.schoolId) {
      return next(new ErrorResponse('Not authorized to delete this record', 401));
    }

    await Exam.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Exam removed' });
  } catch (err) {
    next(err);
  }
};
