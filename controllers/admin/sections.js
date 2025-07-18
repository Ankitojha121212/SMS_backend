const Section = require('../../models/Section');

// Add a new section
exports.addSection = async (req, res) => {
    try {
        const { schoolId } = req.user; // From schoolAuth middleware
        const newSection = new Section({
            ...req.body,
            schoolId,
        });
        const section = await newSection.save();
        res.status(201).json({ success: true, data: section });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, error: err.message });
    }
};

// Get all sections for a school
exports.getSections = async (req, res) => {
    try {
        const { schoolId } = req.user;
        const sections = await Section.find({ schoolId });
        res.status(200).json({ success: true, data: sections });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, error: err.message });
    }
};

// Update a section
exports.updateSection = async (req, res) => {
    try {
        const { schoolId } = req.user;
        let section = await Section.findById(req.params.id);

        if (!section || section.schoolId.toString() !== schoolId.toString()) {
            return res.status(404).json({ success: false, error: 'Section not found or not authorized' });
        }

        section = await Section.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({ success: true, data: section });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, error: err.message });
    }
};

// Delete a section
exports.deleteSection = async (req, res) => {
    try {
        const { schoolId } = req.user;
        const section = await Section.findById(req.params.id);

        if (!section || section.schoolId.toString() !== schoolId.toString()) {
            return res.status(404).json({ success: false, error: 'Section not found or not authorized' });
        }

        await section.deleteOne();

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, error: err.message });
    }
};