
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());


app.use('/api/auth', require('./routes/auth'));
app.use('/api/students', require('./routes/students'));
app.use('/api/teachers', require('./routes/teachers'));
app.use('/api/parents', require('./routes/parents'));
app.use('/api/managers', require('./routes/managers'));
app.use('/api/schools', require('./routes/schools'));
app.use('/api/attendance', require('./routes/attendance'));
app.use('/api/fees', require('./routes/fees'));
app.use('/api/exams', require('./routes/exams'));
app.use('/api/results', require('./routes/results'));
app.use('/api/register', require('./routes/registration'));
app.use('/api/school-auth', require('./routes/schoolAuth'));
app.use('/api/admin/students', require('./routes/admin/students'));
app.use('/api/admin/teachers', require('./routes/admin/teachers'));
app.use('/api/admin/classes', require('./routes/admin/classes'));
app.use('/api/admin/sections', require('./routes/admin/sections'));
app.use('/api/admin/subjects', require('./routes/admin/subjects'));
app.use('/api/admin/timetable', require('./routes/admin/timetable'));
app.use('/api/admin/attendance', require('./routes/admin/attendance'));
app.use('/api/admin/fees', require('./routes/admin/fees'));
app.use('/api/admin/dashboard', require('./routes/admin/dashboard'));

const errorHandler = require('./middleware/error/errorHandler');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use(errorHandler);
