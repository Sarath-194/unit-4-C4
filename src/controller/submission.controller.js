const express = require('express')

const router =  express.Router();
const Submission = require('../models/submissions.model');

router.post('', async(req, res) => {
  try {
    const submission = await Submission.create(req.boby)
    return res.status(201).send(submission)  
  } catch (err) {
    return res.status(500).send(err.message)
  }

})

router.get('', async(req, res) => {
  try {
    const submission = await Submission.find().lean().exec();
    return res.status(200).send(submission)  
  } catch (err) {
    return res.status(500).send(err.message)
  }

})


module.exports = router;