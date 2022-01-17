const express = require('express');

const Evaluation = require('../models/evaluation.model');

const router = express.Router()

router.post("", async(req, res) => {
  try {
    const evaluation = await Evaluation.create(req.body);
    return res.status(200).send(evaluation)
  } catch (err) {
    return res.status(500).send({err:err.message})
  }
})
router.get("", async(req, res) => {
  try {
    const evaluation = await Evaluation.find().lean().exec();
    return res.status(200).send(evaluation)
  } catch (err) {
    return res.status(500).send({err:err.message})
  }
})


module.exports = router;