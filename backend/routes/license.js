const express = require("express");
const router = express.Router();

const crypto = require("crypto");

const License = require("../models/License");

router.post("/generate/:id", async (req, res) => {

  const key = crypto
    .randomBytes(16)
    .toString("hex");

  const license = await License.create({

    userId: req.params.id,

    key,

  });

  res.json(license);

});

router.get("/:userId", async (req, res) => {

  const licenses = await License.find({
    userId: req.params.userId
  });

  res.json(licenses);

});

module.exports = router;