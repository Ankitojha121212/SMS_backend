const { body, validationResult } = require('express-validator');
const ErrorResponse = require('../../utils/errorResponse');

exports.validateRegistration = [
  body('email').isEmail().withMessage('Please include a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be 6 or more characters'),
  body('role').isIn(['student', 'teacher', 'parent', 'manager', 'superadmin']).withMessage('Invalid role'),
  body('schoolId').custom((value, { req }) => {
    if (req.body.role !== 'superadmin' && !value) {
      throw new Error('School ID is required');
    }
    return true;
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorResponse(errors.array().map(err => err.msg).join(', '), 400));
    }
    next();
  },
];

exports.validateLogin = [
  body('email').isEmail().withMessage('Please include a valid email'),
  body('password').not().isEmpty().withMessage('Password is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorResponse(errors.array().map(err => err.msg).join(', '), 400));
    }
    next();
  },
];

exports.validateSchoolRegistration = [
  body('schoolName').not().isEmpty().withMessage('School name is required'),
  body('email').isEmail().withMessage('Please include a valid email'),
  body('primaryPhone').not().isEmpty().withMessage('Primary phone is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorResponse(errors.array().map(err => err.msg).join(', '), 400));
    }
    next();
  },
];

exports.validateStudentCreation = [
  body('email').isEmail().withMessage('Please include a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be 6 or more characters'),
  body('fullName').not().isEmpty().withMessage('Full name is required'),
  body('class').not().isEmpty().withMessage('Class is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorResponse(errors.array().map(err => err.msg).join(', '), 400));
    }
    next();
  },
];

exports.validateStudentUpdate = [
  body('fullName').optional().not().isEmpty().withMessage('Full name cannot be empty'),
  body('class').optional().not().isEmpty().withMessage('Class cannot be empty'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorResponse(errors.array().map(err => err.msg).join(', '), 400));
    }
    next();
  },
];

exports.validateTeacherCreation = [
  body('email').isEmail().withMessage('Please include a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be 6 or more characters'),
  body('fullName').not().isEmpty().withMessage('Full name is required'),
  body('qualification').not().isEmpty().withMessage('Qualification is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorResponse(errors.array().map(err => err.msg).join(', '), 400));
    }
    next();
  },
];

exports.validateTeacherUpdate = [
  body('fullName').optional().not().isEmpty().withMessage('Full name cannot be empty'),
  body('qualification').optional().not().isEmpty().withMessage('Qualification cannot be empty'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorResponse(errors.array().map(err => err.msg).join(', '), 400));
    }
    next();
  },
];

exports.validateParentCreation = [
  body('email').isEmail().withMessage('Please include a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be 6 or more characters'),
  body('fullName').not().isEmpty().withMessage('Full name is required'),
  body('studentId').not().isEmpty().withMessage('Student ID is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorResponse(errors.array().map(err => err.msg).join(', '), 400));
    }
    next();
  },
];

exports.validateParentUpdate = [
  body('fullName').optional().not().isEmpty().withMessage('Full name cannot be empty'),
  body('studentId').optional().not().isEmpty().withMessage('Student ID cannot be empty'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorResponse(errors.array().map(err => err.msg).join(', '), 400));
    }
    next();
  },
];

exports.validateManagerCreation = [
  body('email').isEmail().withMessage('Please include a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be 6 or more characters'),
  body('fullName').not().isEmpty().withMessage('Full name is required'),
  body('designation').not().isEmpty().withMessage('Designation is required'),
  body('accessLevel').isIn(['superadmin', 'manager']).withMessage('Invalid access level'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorResponse(errors.array().map(err => err.msg).join(', '), 400));
    }
    next();
  },
];

exports.validateManagerUpdate = [
  body('fullName').optional().not().isEmpty().withMessage('Full name cannot be empty'),
  body('designation').optional().not().isEmpty().withMessage('Designation cannot be empty'),
  body('accessLevel').optional().isIn(['superadmin', 'manager']).withMessage('Invalid access level'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorResponse(errors.array().map(err => err.msg).join(', '), 400));
    }
    next();
  },
];

exports.validateMarkAttendance = [
  body('studentId').not().isEmpty().withMessage('Student ID is required'),
  body('date').isISO8601().toDate().withMessage('Valid date is required'),
  body('status').isIn(['present', 'absent', 'late']).withMessage('Invalid attendance status'),
  body('class').not().isEmpty().withMessage('Class is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorResponse(errors.array().map(err => err.msg).join(', '), 400));
    }
    next();
  },
];

exports.validateUpdateAttendance = [
  body('status').optional().isIn(['present', 'absent', 'late']).withMessage('Invalid attendance status'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorResponse(errors.array().map(err => err.msg).join(', '), 400));
    }
    next();
  },
];

exports.validateCreateFee = [
  body('studentId').not().isEmpty().withMessage('Student ID is required'),
  body('amount').isNumeric().withMessage('Amount must be a number'),
  body('dueDate').isISO8601().toDate().withMessage('Valid due date is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorResponse(errors.array().map(err => err.msg).join(', '), 400));
    }
    next();
  },
];

exports.validateUpdateFeeStatus = [
  body('status').isIn(['paid', 'pending', 'overdue']).withMessage('Invalid fee status'),
  body('paymentDate').optional().isISO8601().toDate().withMessage('Valid payment date is required'),
  body('transactionId').optional().not().isEmpty().withMessage('Transaction ID cannot be empty'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorResponse(errors.array().map(err => err.msg).join(', '), 400));
    }
    next();
  },
];

exports.validateCreateExam = [
  body('title').not().isEmpty().withMessage('Exam title is required'),
  body('subject').not().isEmpty().withMessage('Subject is required'),
  body('class').not().isEmpty().withMessage('Class is required'),
  body('date').isISO8601().toDate().withMessage('Valid exam date is required'),
  body('maxMarks').isNumeric().withMessage('Max marks must be a number'),
  body('teacherId').not().isEmpty().withMessage('Teacher ID is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorResponse(errors.array().map(err => err.msg).join(', '), 400));
    }
    next();
  },
];

exports.validateUpdateExam = [
  body('title').optional().not().isEmpty().withMessage('Exam title cannot be empty'),
  body('subject').optional().not().isEmpty().withMessage('Subject cannot be empty'),
  body('class').optional().not().isEmpty().withMessage('Class cannot be empty'),
  body('date').optional().isISO8601().toDate().withMessage('Valid exam date is required'),
  body('maxMarks').optional().isNumeric().withMessage('Max marks must be a number'),
  body('teacherId').optional().not().isEmpty().withMessage('Teacher ID cannot be empty'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorResponse(errors.array().map(err => err.msg).join(', '), 400));
    }
    next();
  },
];

exports.validateAddResult = [
  body('examId').not().isEmpty().withMessage('Exam ID is required'),
  body('studentId').not().isEmpty().withMessage('Student ID is required'),
  body('marksObtained').isNumeric().withMessage('Marks obtained must be a number'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorResponse(errors.array().map(err => err.msg).join(', '), 400));
    }
    next();
  },
];

exports.validateUpdateResult = [
  body('marksObtained').optional().isNumeric().withMessage('Marks obtained must be a number'),
  body('grade').optional().not().isEmpty().withMessage('Grade cannot be empty'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ErrorResponse(errors.array().map(err => err.msg).join(', '), 400));
    }
    next();
  },
];