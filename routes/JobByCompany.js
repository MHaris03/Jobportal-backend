const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

router.get('/company-jobs/:companyId', async (req, res) => {
  const companyId = req.params.companyId;

  try {
    const jobs = await Job.find({ companyId });
    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});
router.get('/jobdetails/:id', async (req, res) => {
  const jobId = req.params.id;

  // Validate job ID
  if (!ObjectId.isValid(jobId)) {
    return res.status(400).send({ message: 'Invalid job ID' });
  }

  try {
    // Fetch job details from the collection
    const job = await Job.findById(jobId);
    
    if (!job) {
      return res.status(404).send({ message: 'Job not found' });
    }
    
    res.json(job);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

module.exports = router;
