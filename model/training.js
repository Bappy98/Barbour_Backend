const mongoose = require("mongoose");

const trainingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    require: true,
  },
  image: {
    type: String,
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  pageDetails: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TrainingDetails",
    },
  ],
});

module.exports = mongoose.model("TrainingSchema", trainingSchema);
