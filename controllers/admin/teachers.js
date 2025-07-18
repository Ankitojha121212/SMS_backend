const Teacher = require('../../models/Teacher');

// Add a new teacher
exports.addTeacher = async (req, res) => {
    try {
        const { schoolId } = req.user; // From schoolAuth middleware
        const newTeacher = new Teacher({
            ...req.body,
            schoolId,
        });
        const teacher = await newTeacher.save();
        res.status(201).json({ success: true, data: teacher });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, error: err.message });
    }
};

// Get all teachers for a school
exports.getTeachers = async (req, res) => {
    try {
        const { schoolId } = req.user;
        const teachers = await Teacher.find({ schoolId });
        res.status(200).json({ success: true, data: teachers });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, error: err.message });
    }
};

// Update a teacher
exports.updateTeacher = async (req, res) => {
    try {
        const { schoolId } = req.user;
        let teacher = await Teacher.findById(req.params.id);

        if (!teacher || teacher.schoolId.toString() !== schoolId.toString()) {
            return res.status(404).json({ success: false, error: 'Teacher not found or not authorized' });
        }

        teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({ success: true, data: teacher });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, error: err.message });
    }
};

// Delete a teacher
exports.deleteTeacher = async (req, res) => {
    try {
        const { schoolId } = req.user;
        const teacher = await Teacher.findById(req.params.id);

        if (!teacher || teacher.schoolId.toString() !== schoolId.toString()) {
            return res.status(404).json({ success: false, error: 'Teacher not found or not authorized' });
        }

        await teacher.deleteOne();

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, error: err.message });
    }
};