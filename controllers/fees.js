const Fee = require('../models/Fee');
const ErrorResponse = require('../utils/errorResponse');

exports.createFee = async (req, res, next) => {
  const { studentId, amount, dueDate, description } = req.body;
  const schoolId = req.user.schoolId;

  try {
    const fee = new Fee({
      studentId,
      schoolId,
      amount,
      dueDate,
      description,
    });

    await fee.save();
    res.status(201).json(fee);
  } catch (err) {
    next(err);
  }
};

exports.getFeesByStudent = async (req, res, next) => {
  try {
    const fees = await Fee.find({
      studentId: req.params.studentId,
      schoolId: req.user.schoolId,
    }).populate('studentId', 'fullName');

    res.json(fees);
  } catch (err) {
    next(err);
  }
};

exports.updateFeeStatus = async (req, res, next) => {
  const { status, paymentDate, transactionId } = req.body;

  try {
    let fee = await Fee.findById(req.params.id);

    if (!fee) {
      return next(new ErrorResponse('Fee record not found', 404));
    }

    // Ensure the record belongs to the user's school
    if (fee.schoolId.toString() !== req.user.schoolId) {
      return next(new ErrorResponse('Not authorized to update this record', 401));
    }

    fee.status = status || fee.status;
    fee.paymentDate = paymentDate || fee.paymentDate;
    fee.transactionId = transactionId || fee.transactionId;

    await fee.save();
    res.json(fee);
  } catch (err) {
    next(err);
  }
};

exports.getAllFees = async (req, res, next) => {
  try {
    const fees = await Fee.find({ schoolId: req.user.schoolId }).populate('studentId', 'fullName');
    res.json(fees);
  } catch (err) {
    next(err);
  }
};

exports.deleteFee = async (req, res, next) => {
  try {
    const fee = await Fee.findById(req.params.id);

    if (!fee) {
      return next(new ErrorResponse('Fee record not found', 404));
    }

    // Ensure the record belongs to the user's school
    if (fee.schoolId.toString() !== req.user.schoolId) {
      return next(new ErrorResponse('Not authorized to delete this record', 401));
    }

    await Fee.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Fee record removed' });
  } catch (err) {
    next(err);
  }
};

