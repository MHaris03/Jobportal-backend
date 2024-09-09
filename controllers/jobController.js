const Job = require('../models/Job');
const { ObjectId } = require('mongoose');

// Create or Update a Job
exports.createOrUpdateJob = async (req, res) => {
    const { title, description, companyId, companyName, companyEmail, companyLogo, location, minimumSalary, maximumSalary, salaryType, experienceLevel, category, skills, employmentType, _id } = req.body;

    try {
        let job;

        if (_id) {
            job = await Job.findById(_id);
            if (job) {
                job = await Job.findByIdAndUpdate(_id, req.body, { new: true, upsert: true });
            } else {
                return res.status(404).json({ message: 'Job not found' });
            }
        } else {
            job = new Job({
                title,
                description,
                companyId,
                companyName,
                companyEmail,
                companyLogo,
                location,
                minimumSalary,
                maximumSalary,
                salaryType,
                experienceLevel,
                category,
                skills,
                employmentType,
                createdAt: new Date(),
                user: req.user.id
            });
            await job.save();
        }

        res.status(200).json(job);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

// Get Job Details by ID
exports.getJobById = async (req, res) => {
    const jobId = req.params.id;

    if (!ObjectId.isValid(jobId)) {
        return res.status(400).send({ message: 'Invalid job ID' });
    }

    try {
        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).send({ message: 'Job not found' });
        }

        res.json(job);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

// Get Jobs by Category
exports.getJobsByCategory = async (req, res) => {
    const category = req.params.category;

    try {
        const jobs = await Job.find({ category });
        res.json(jobs);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

// Get Jobs by Location
exports.getJobsByLocation = async (req, res) => {
    const location = req.params.location;

    try {
        const jobs = await Job.find({ location });
        res.json(jobs);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

// Get Jobs by Company ID
exports.getJobsByCompany = async (req, res) => {
    const companyId = req.params.companyId;

    try {
        const jobs = await Job.find({ companyId });
        res.json(jobs);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};
