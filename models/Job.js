const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  companyId: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  companyEmail: {
    type: String,
    required: true,
  },
  companyLogo: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  minimumSalary: {
    type: Number,
    required: true,
  },
  maximumSalary: {
    type: Number,
    required: true,
  },
  salaryType: {
    type: String,
    enum: ['hourly', 'annual', 'monthly'],
    required: true,
  },
  experienceLevel: {
    type: String,
    enum: ['entry', 'mid', 'senior'],
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  employmentType: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'internship'],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Job = mongoose.model('Job', JobSchema);
module.exports = Job;
