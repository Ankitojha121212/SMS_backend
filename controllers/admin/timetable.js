const Timetable = require('../../models/Timetable');

// Add a new timetable entry
exports.addTimetableEntry = async (req, res) => {
    try {
        const { schoolId } = req.user; // From schoolAuth middleware
        const newEntry = new Timetable({
            ...req.body,
            schoolId,
        });
        const entry = await newEntry.save();
        res.status(201).json({ success: true, data: entry });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, error: err.message });
    }
};

// Get all timetable entries for a school
exports.getTimetableEntries = async (req, res) => {
    try {
        const { schoolId } = req.user;
        const entries = await Timetable.find({ schoolId });
        res.status(200).json({ success: true, data: entries });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, error: err.message });
    }
};

// Update a timetable entry
exports.updateTimetableEntry = async (req, res) => {
    try {
        const { schoolId } = req.user;
        let entry = await Timetable.findById(req.params.id);

        if (!entry || entry.schoolId.toString() !== schoolId.toString()) {
            return res.status(404).json({ success: false, error: 'Timetable entry not found or not authorized' });
        }

        entry = await Timetable.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({ success: true, data: entry });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, error: err.message });
    }
};

// Delete a timetable entry
exports.deleteTimetableEntry = async (req, res) => {
    try {
        const { schoolId } = req.user;
        const entry = await Timetable.findById(req.params.id);

        if (!entry || entry.schoolId.toString() !== schoolId.toString()) {
            return res.status(404).json({ success: false, error: 'Timetable entry not found or not authorized' });
        }

        await entry.deleteOne();

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, error: err.message });
    }
};