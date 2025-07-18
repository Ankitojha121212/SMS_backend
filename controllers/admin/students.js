const Student = require('../../models/Student');

// Add a new student
exports.addStudent = async (req, res) => {
    try {
        const { schoolId } = req.user; // From schoolAuth middleware
        const newStudent = new Student({
            ...req.body,
            schoolId,
        });
        const student = await newStudent.save();
        res.status(201).json({ success: true, data: student });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, error: err.message });
    }
};

// Get all students for a school
exports.getStudents = async (req, res) => {
    try {
        const { schoolId } = req.user;
        const students = await Student.find({ schoolId });
        res.status(200).json({ success: true, data: students });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, error: err.message });
    }
};

// Update a student
exports.updateStudent = async (req, res) => {
    try {
        const { schoolId } = req.user;
        let student = await Student.findById(req.params.id);

        if (!student || student.schoolId.toString() !== schoolId.toString()) {
            return res.status(404).json({ success: false, error: 'Student not found or not authorized' });
        }

        student = await Student.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({ success: true, data: student });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, error: err.message });
    }
};

// Delete a student
exports.deleteStudent = async (req, res) => {
    try {
        const { schoolId } = req.user;
        const student = await Student.findById(req.params.id);

        if (!student || student.schoolId.toString() !== schoolId.toString()) {
            return res.status(404).json({ success: false, error: 'Student not found or not authorized' });
        }

        await student.deleteOne();

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, error: err.message });
    }
};