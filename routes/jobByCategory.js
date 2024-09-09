const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

router.get('/categories/:category', async (req, res) => {
    const category = req.params.category;

    try {
        const jobs = await Job.find({ category });
        res.json(jobs);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

module.exports = router;
