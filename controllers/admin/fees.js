const Fee = require('../../models/Fee');
const ErrorResponse = require('../../utils/errorResponse');

// @desc    Get all fees
// @route   GET /api/admin/fees
// @access  Private (School Admin)
exports.getFees = async (req, res, next) => {
    try {
        const fees = await Fee.find({ schoolId: req.user.schoolId }).populate('studentId', 'name class rollNumber');
        res.status(200).json({ success: true, data: fees });
    } catch (err) {
        next(err);
    }
};

// @desc    Create a fee
// @route   POST /api/admin/fees
// @access  Private (School Admin)
exports.createFee = async (req, res, next) => {
    try {
        req.body.schoolId = req.user.schoolId;
        const fee = await Fee.create(req.body);
        res.status(201).json({ success: true, data: fee });
    } catch (err) {
        next(err);
    }
};

// @desc    Update a fee
// @route   PUT /api/admin/fees/:id
// @access  Private (School Admin)
exports.updateFee = async (req, res, next) => {
    try {
        let fee = await Fee.findById(req.params.id);

        if (!fee) {
            return next(new ErrorResponse(`Fee not found with id of ${req.params.id}`, 404));
        }

        if (fee.schoolId.toString() !== req.user.schoolId) {
            return next(new ErrorResponse(`User not authorized to update this fee`, 401));
        }

        fee = await Fee.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: fee });
    } catch (err) {
        next(err);
    }
};

// @desc    Delete a fee
// @route   DELETE /api/admin/fees/:id
// @access  Private (School Admin)
exports.deleteFee = async (req, res, next) => {
    try {
        const fee = await Fee.findById(req.params.id);

        if (!fee) {
            return next(new ErrorResponse(`Fee not found with id of ${req.params.id}`, 404));
        }

        if (fee.schoolId.toString() !== req.user.schoolId) {
            return next(new ErrorResponse(`User not authorized to delete this fee`, 401));
        }

        await fee.remove();

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        next(err);
    }
};
