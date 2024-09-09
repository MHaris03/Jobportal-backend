const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Job = require('../models/Job');

// POST /post-job - Post a new job or update an existing job
router.post('/post-job', auth, async (req, res) => {
  try {
    let body = req.body;

    if (body.data) {
      body = body.data;
    }

    if (body._id) {
      body._id = mongoose.Types.ObjectId(body._id);
    }

    body.createdAt = new Date();

    let companyId = 'v3-company-id';
    if (body.companyName) {
      companyId = body.companyName
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '');
    }
    body.companyId = companyId;

    // Set the user who posted the job
    body.user = req.user.id;

    let job = null;
    if (body._id) {
      job = await Job.findById(body._id);
    }

    let result;
    if (job == null) {
      result = new Job(body);
      await result.save();
    } else {
      result = await Job.findByIdAndUpdate(body._id, body, {
        new: true,
        upsert: true,
      });
    }

    if (result) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json({
        message: 'Cannot Insert or Update, Try Again Later!',
        status: false,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Internal Server Error',
      status: false,
    });
  }
});
router.get('/all-jobs', auth, async (req, res) => {
    try {
      const jobs = await Job.find().populate('user'); 
      res.status(200).json(jobs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
module.exports = router;
