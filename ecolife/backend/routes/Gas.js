const express = require("express");
const router = express.Router();
const { Gas } = require("../models"); // Import Gas model

router.get("/", async (req, res) => {
  const listOfGasUsage = await Gas.findAll();
  res.json(listOfGasUsage);
});

router.post("/", async (req, res) => {
  const gasUsage = req.body;
  await Gas.create(gasUsage);
  res.json(gasUsage);
});

module.exports = router;
