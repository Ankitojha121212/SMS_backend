const Attendance = require('../../models/Attendance');

// Add a new attendance record
exports.addAttendance = async (req, res) => {
    try {
        const { schoolId } = req.user; // From schoolAuth middleware
        const newAttendance = new Attendance({
            ...req.body,
            schoolId,
        });
        const attendance = await newAttendance.save();
        res.status(201).json({ success: true, data: attendance });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, error: err.message });
    }
};

// Get all attendance records for a school
exports.getAttendance = async (req, res) => {
    try {
        const { schoolId } = req.user;
        const attendance = await Attendance.find({ schoolId });
        res.status(200).json({ success: true, data: attendance });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, error: err.message });
    }
};

// Update an attendance record
exports.updateAttendance = async (req, res) => {
    try {
        const { schoolId } = req.user;
        let attendance = await Attendance.findById(req.params.id);

        if (!attendance || attendance.schoolId.toString() !== schoolId.toString()) {
            return res.status(404).json({ success: false, error: 'Attendance record not found or not authorized' });
        }

        attendance = await Attendance.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({ success: true, data: attendance });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, error: err.message });
    }
};

// Delete an attendance record
exports.deleteAttendance = async (req, res) => {
    try {
        const { schoolId } = req.user;
        const attendance = await Attendance.findById(req.params.id);

        if (!attendance || attendance.schoolId.toString() !== schoolId.toString()) {
            return res.status(404).json({ success: false, error: 'Attendance record not found or not authorized' });
        }

        await attendance.deleteOne();

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, error: err.message });
    }
};
