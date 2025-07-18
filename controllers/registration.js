const SchoolRegistration = require('../models/SchoolRegistration');

exports.saveIncompleteRegistration = async (req, res) => {
    const { sessionId, currentStep, data } = req.body;

    try {
        let registration = await SchoolRegistration.findOne({ sessionId });

        if (registration) {
            registration.currentStep = currentStep;
            registration.data = { ...registration.data, ...data };
            await registration.save();
        } else {
            registration = await SchoolRegistration.create({
                sessionId,
                currentStep,
                data,
            });
        }

        res.status(200).json({ success: true, data: registration });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.completeRegistration = async (req, res) => {
    const { sessionId, data } = req.body;

    try {
        const registration = await SchoolRegistration.findOne({ sessionId });

        if (!registration) {
            return res.status(404).json({ success: false, error: 'Registration not found' });
        }

        // Exclude password and confirmPassword from being saved in registration data
        const { password, confirmPassword, ...restOfData } = data;
        registration.data = restOfData;
        registration.status = 'complete';
        await registration.save();

        res.status(200).json({ success: true, data: registration });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getRegistration = async (req, res) => {
    try {
        const registration = await SchoolRegistration.findOne({ sessionId: req.params.sessionId });

        if (!registration) {
            return res.status(404).json({ success: false, error: 'Registration not found' });
        }

        res.status(200).json({ success: true, data: registration });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};