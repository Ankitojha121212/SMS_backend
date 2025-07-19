const User = require('../models/User');
const School = require('../models/School');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new school admin and create a school entry
exports.registerSchool = async (req, res) => {
    const {
        schoolName,
        email,
        password,
        primaryPhone,
        alternatePhone,
        whatsappNumber,
        schoolCode,
        registrationNumber,
        type,
        establishedYear,
        ownership,
        board,
        country,
        state,
        city,
        pinCode,
        addressLine1,
        addressLine2,
        principalName,
        principalPhone,
        principalEmail,
        adminName,
        adminPhone,
        academicSessionStartMonth,
        classesOffered,
        streamsOffered,
        languagesTaught,
        medium,
        totalStudents,
        totalTeachers,
        totalNonTeachingStaff,
        hasHostel,
        hasTransport,
        hasSmartClasses,
        noOfLabs,
        noOfLibraries,
        sportsFacilities,
        logo,
        themeColor,
        accentColor,
        fontPreference,
        primaryLanguage,
        timezone,
        preferredLoginMethod,
        hasStudentAppAccess,
        hasParentAppAccess,
        modulesEnabled,
        needsOnlineClasses,
        needsPaymentIntegration,
        govtRecognitionCertificate,
        principalIDProof,
        schoolSealImage,
        acceptsDataPolicy,
        agreedToTerms,
        marketingConsent,
    } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Create School entry first
        const school = new School({
            name: schoolName,
            primaryPhone,
            alternatePhone,
            whatsappNumber,
            email,
            schoolCode,
            registrationNumber,
            type,
            establishedYear,
            ownership,
            board,
            country,
            state,
            city,
            pinCode,
            addressLine1,
            addressLine2,
            principalName,
            principalPhone,
            principalEmail,
            adminName,
            adminPhone,
            academicSessionStartMonth,
            classesOffered,
            streamsOffered,
            languagesTaught,
            medium,
            totalStudents,
            totalTeachers,
            totalNonTeachingStaff,
            hasHostel,
            hasTransport,
            hasSmartClasses,
            noOfLabs,
            noOfLibraries,
            sportsFacilities,
            logo,
            themeColor,
            accentColor,
            fontPreference,
            primaryLanguage,
            timezone,
            preferredLoginMethod,
            hasStudentAppAccess,
            hasParentAppAccess,
            modulesEnabled,
            needsOnlineClasses,
            needsPaymentIntegration,
            govtRecognitionCertificate,
            principalIDProof,
            schoolSealImage,
            acceptsDataPolicy,
            agreedToTerms,
            marketingConsent,
        });

        await school.save();

        // Create User entry with schoolId
        user = new User({
            email,
            password,
            role: 'school',
            schoolId: school._id,
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id,
                role: user.role,
                schoolId: user.schoolId,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Login school admin
exports.loginSchool = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        if (user.role !== 'school') {
            return res.status(403).json({ msg: 'Access denied. Not a school admin.' });
        }

        const payload = {
            user: {
                id: user.id,
                role: user.role,
                schoolId: user.schoolId,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};