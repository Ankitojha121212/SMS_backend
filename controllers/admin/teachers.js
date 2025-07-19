const Teacher = require('../../models/Teacher');
const ErrorResponse = require('../../utils/errorResponse');

// @desc    Get all teachers
// @route   GET /api/admin/teachers
// @access  Private (School Admin)
exports.getTeachers = async (req, res, next) => {
    try {
        const teachers = await Teacher.find({ schoolId: req.user.schoolId });
        res.status(200).json({ success: true, data: teachers });
    } catch (err) {
        next(err);
    }
};

// @desc    Create a teacher
// @route   POST /api/admin/teachers
// @access  Private (School Admin)
exports.createTeacher = async (req, res, next) => {
    try {
        req.body.schoolId = req.user.schoolId;
        const teacher = await Teacher.create(req.body);
        res.status(201).json({ success: true, data: teacher });
    } catch (err) {
        next(err);
    }
};

// @desc    Update a teacher
// @route   PUT /api/admin/teachers/:id
// @access  Private (School Admin)
exports.updateTeacher = async (req, res, next) => {
    try {
        let teacher = await Teacher.findById(req.params.id);

        if (!teacher) {
            return next(new ErrorResponse(`Teacher not found with id of ${req.params.id}`, 404));
        }

        if (teacher.schoolId.toString() !== req.user.schoolId) {
            return next(new ErrorResponse(`User not authorized to update this teacher`, 401));
        }

        teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: teacher });
    } catch (err) {
        next(err);
    }
};

// @desc    Delete a teacher
// @route   DELETE /api/admin/teachers/:id
// @access  Private (School Admin)
exports.deleteTeacher = async (req, res, next) => {
    try {
        const teacher = await Teacher.findById(req.params.id);

        if (!teacher) {
            return next(new ErrorResponse(`Teacher not found with id of ${req.params.id}`, 404));
        }

        if (teacher.schoolId.toString() !== req.user.schoolId) {
            return next(new ErrorResponse(`User not authorized to delete this teacher`, 401));
        }

        await teacher.remove();

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        next(err);
    }
};
