const mongoose = require("mongoose");

const LicenseSchema = new mongoose.Schema({

  userId: String,

  key: String,

  ativa: {
    type: Boolean,
    default: true,
  },

  expiresAt: {
    type: Date,
    default: () =>
      Date.now() +
      30 * 24 * 60 * 60 * 1000
  }

});

module.exports = mongoose.model(
  "License",
  LicenseSchema
);