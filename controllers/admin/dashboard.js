const Student = require('../../models/Student');
const Teacher = require('../../models/Teacher');
const Attendance = require('../../models/Attendance');

// Get dashboard statistics for a school
exports.getDashboardStats = async (req, res) => {
    try {
        const { schoolId } = req.user; // From schoolAuth middleware

        const totalStudents = await Student.countDocuments({ schoolId });
        const totalTeachers = await Teacher.countDocuments({ schoolId });

        // Get today's attendance (example: count present students)
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const presentStudentsToday = await Attendance.countDocuments({
            schoolId,
            date: {
                $gte: today,
                $lt: tomorrow,
            },
            status: 'Present',
        });

        res.status(200).json({
            success: true,
            data: {
                totalStudents,
                totalTeachers,
                presentStudentsToday,
                // Add more stats as needed
            },
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, error: err.message });
    }
};