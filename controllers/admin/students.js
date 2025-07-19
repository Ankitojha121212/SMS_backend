const Student = require('../../models/Student');
const ErrorResponse = require('../../utils/errorResponse');

// @desc    Get all students
// @route   GET /api/admin/students
// @access  Private (School Admin)
exports.getStudents = async (req, res, next) => {
    try {
        const students = await Student.find({ schoolId: req.user.schoolId });
        res.status(200).json({ success: true, data: students });
    } catch (err) {
        next(err);
    }
};

// @desc    Create a student
// @route   POST /api/admin/students
// @access  Private (School Admin)
exports.createStudent = async (req, res, next) => {
    try {
        req.body.schoolId = req.user.schoolId;
        const student = await Student.create(req.body);
        res.status(201).json({ success: true, data: student });
    } catch (err) {
        next(err);
    }
};

// @desc    Update a student
// @route   PUT /api/admin/students/:id
// @access  Private (School Admin)
exports.updateStudent = async (req, res, next) => {
    try {
        let student = await Student.findById(req.params.id);

        if (!student) {
            return next(new ErrorResponse(`Student not found with id of ${req.params.id}`, 404));
        }

        if (student.schoolId.toString() !== req.user.schoolId) {
            return next(new ErrorResponse(`User not authorized to update this student`, 401));
        }

        student = await Student.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: student });
    } catch (err) {
        next(err);
    }
};

// @desc    Delete a student
// @route   DELETE /api/admin/students/:id
// @access  Private (School Admin)
exports.deleteStudent = async (req, res, next) => {
    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return next(new ErrorResponse(`Student not found with id of ${req.params.id}`, 404));
        }

        if (student.schoolId.toString() !== req.user.schoolId) {
            return next(new ErrorResponse(`User not authorized to delete this student`, 401));
        }

        await student.remove();

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        next(err);
    }
};
