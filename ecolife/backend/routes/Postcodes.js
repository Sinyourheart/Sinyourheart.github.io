const express = require("express");
const router = express.Router();
const { Postcodes } = require("../models"); // Import Postcodes model

router.get("/", async (req, res) => {
  const listOfPostcodes = await Postcodes.findAll();
  res.json(listOfPostcodes);
});

router.post("/", async (req, res) => {
  const postcode = req.body;
  await Postcodes.create(postcode);
  res.json(postcode);
});

module.exports = router;
