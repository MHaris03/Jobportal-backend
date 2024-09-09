const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

router.get('/Location/:location', async (req, res) => {
  const location = req.params.location;

  try {
    const jobs = await Job.find({ location });
    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

module.exports = router;
