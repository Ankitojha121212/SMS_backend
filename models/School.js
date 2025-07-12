
const mongoose = require('mongoose');

const SchoolSchema = new mongoose.Schema({
  schoolName: {
    type: String,
    required: true,
  },
  schoolCode: {
    type: String,
  },
  registrationNumber: {
    type: String,
  },
  type: {
    type: String,
    enum: ['school', 'college', 'university', 'coaching'],
  },
  establishedYear: {
    type: Number,
  },
  ownership: {
    type: String,
    enum: ['private', 'government', 'aided', 'trust'],
  },
  country: {
    type: String,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  pinCode: {
    type: String,
  },
  addressLine1: {
    type: String,
  },
  addressLine2: {
    type: String,
  },
  locationCoordinates: {
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
  },
  primaryPhone: {
    type: String,
  },
  alternatePhone: {
    type: String,
  },
  email: {
    type: String,
  },
  website: {
    type: String,
  },
  supportEmail: {
    type: String,
  },
  whatsappNumber: {
    type: String,
  },
  principalName: {
    type: String,
  },
  principalPhone: {
    type: String,
  },
  principalEmail: {
    type: String,
  },
  adminName: {
    type: String,
  },
  adminPhone: {
    type: String,
  },
  academicSessionStartMonth: {
    type: String,
  },
  classesOffered: {
    type: [String],
  },
  streamsOffered: {
    type: [String],
  },
  board: {
    type: String,
  },
  languagesTaught: {
    type: [String],
  },
  medium: {
    type: String,
  },
  totalStudents: {
    type: Number,
  },
  totalTeachers: {
    type: Number,
  },
  totalNonTeachingStaff: {
    type: Number,
  },
  noOfSectionsPerClass: {
    type: Object,
  },
  hasHostel: {
    type: Boolean,
  },
  hasTransport: {
    type: Boolean,
  },
  hasSmartClasses: {
    type: Boolean,
  },
  noOfLabs: {
    type: Number,
  },
  noOfLibraries: {
    type: Number,
  },
  sportsFacilities: {
    type: [String],
  },
  logo: {
    type: String,
  },
  themeColor: {
    type: String,
  },
  accentColor: {
    type: String,
  },
  fontPreference: {
    type: String,
  },
  primaryLanguage: {
    type: String,
  },
  timezone: {
    type: String,
  },
  preferredLoginMethod: {
    type: String,
  },
  hasStudentAppAccess: {
    type: Boolean,
  },
  hasParentAppAccess: {
    type: Boolean,
  },
  modulesEnabled: {
    type: [String],
  },
  needsOnlineClasses: {
    type: Boolean,
  },
  needsPaymentIntegration: {
    type: Boolean,
  },
  govtRecognitionCertificate: {
    type: String,
  },
  principalIDProof: {
    type: String,
  },
  schoolSealImage: {
    type: String,
  },
  acceptsDataPolicy: {
    type: Boolean,
  },
  agreedToTerms: {
    type: Boolean,
  },
  marketingConsent: {
    type: Boolean,
  },
});

module.exports = mongoose.model('School', SchoolSchema);
