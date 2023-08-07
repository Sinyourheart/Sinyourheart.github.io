const express = require("express");
const router = express.Router();
const { Electricity } = require("../models"); // Import Electricity model

router.get("/", async (req, res) => {
  const listOfUsage = await Electricity.findAll();
  res.json(listOfUsage);
});

router.post("/", async (req, res) => {
  const usage = req.body;
  await Electricity.create(usage);
  res.json(usage);
});

module.exports = router;
