const Class = require('../../models/Class');

// Add a new class
exports.addClass = async (req, res) => {
    try {
        const { schoolId } = req.user; // From schoolAuth middleware
        const newClass = new Class({
            ...req.body,
            schoolId,
        });
        const classObj = await newClass.save();
        res.status(201).json({ success: true, data: classObj });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, error: err.message });
    }
};

// Get all classes for a school
exports.getClasses = async (req, res) => {
    try {
        const { schoolId } = req.user;
        const classes = await Class.find({ schoolId });
        res.status(200).json({ success: true, data: classes });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, error: err.message });
    }
};

// Update a class
exports.updateClass = async (req, res) => {
    try {
        const { schoolId } = req.user;
        let classObj = await Class.findById(req.params.id);

        if (!classObj || classObj.schoolId.toString() !== schoolId.toString()) {
            return res.status(404).json({ success: false, error: 'Class not found or not authorized' });
        }

        classObj = await Class.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({ success: true, data: classObj });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, error: err.message });
    }
};

// Delete a class
exports.deleteClass = async (req, res) => {
    try {
        const { schoolId } = req.user;
        const classObj = await Class.findById(req.params.id);

        if (!classObj || classObj.schoolId.toString() !== schoolId.toString()) {
            return res.status(404).json({ success: false, error: 'Class not found or not authorized' });
        }

        await classObj.deleteOne();

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, error: err.message });
    }
};