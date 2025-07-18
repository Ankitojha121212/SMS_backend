const Fee = require('../../models/Fee');

// Add a new fee record
exports.addFee = async (req, res) => {
    try {
        const { schoolId } = req.user; // From schoolAuth middleware
        const newFee = new Fee({
            ...req.body,
            schoolId,
        });
        const fee = await newFee.save();
        res.status(201).json({ success: true, data: fee });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, error: err.message });
    }
};

// Get all fee records for a school
exports.getFees = async (req, res) => {
    try {
        const { schoolId } = req.user;
        const fees = await Fee.find({ schoolId });
        res.status(200).json({ success: true, data: fees });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, error: err.message });
    }
};

// Update a fee record
exports.updateFee = async (req, res) => {
    try {
        const { schoolId } = req.user;
        let fee = await Fee.findById(req.params.id);

        if (!fee || fee.schoolId.toString() !== schoolId.toString()) {
            return res.status(404).json({ success: false, error: 'Fee record not found or not authorized' });
        }

        fee = await Fee.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({ success: true, data: fee });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, error: err.message });
    }
};

// Delete a fee record
exports.deleteFee = async (req, res) => {
    try {
        const { schoolId } = req.user;
        const fee = await Fee.findById(req.params.id);

        if (!fee || fee.schoolId.toString() !== schoolId.toString()) {
            return res.status(404).json({ success: false, error: 'Fee record not found or not authorized' });
        }

        await fee.deleteOne();

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, error: err.message });
    }
};