const Subject = require('../../models/Subject');

// Add a new subject
exports.addSubject = async (req, res) => {
    try {
        const { schoolId } = req.user; // From schoolAuth middleware
        const newSubject = new Subject({
            ...req.body,
            schoolId,
        });
        const subject = await newSubject.save();
        res.status(201).json({ success: true, data: subject });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, error: err.message });
    }
};

// Get all subjects for a school
exports.getSubjects = async (req, res) => {
    try {
        const { schoolId } = req.user;
        const subjects = await Subject.find({ schoolId });
        res.status(200).json({ success: true, data: subjects });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, error: err.message });
    }
};

// Update a subject
exports.updateSubject = async (req, res) => {
    try {
        const { schoolId } = req.user;
        let subject = await Subject.findById(req.params.id);

        if (!subject || subject.schoolId.toString() !== schoolId.toString()) {
            return res.status(404).json({ success: false, error: 'Subject not found or not authorized' });
        }

        subject = await Subject.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({ success: true, data: subject });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, error: err.message });
    }
};

// Delete a subject
exports.deleteSubject = async (req, res) => {
    try {
        const { schoolId } = req.user;
        const subject = await Subject.findById(req.params.id);

        if (!subject || subject.schoolId.toString() !== schoolId.toString()) {
            return res.status(404).json({ success: false, error: 'Subject not found or not authorized' });
        }

        await subject.deleteOne();

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, error: err.message });
    }
};