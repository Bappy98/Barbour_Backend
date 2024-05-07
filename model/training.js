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
  pageDetails: {
    type: Array,
    items: {
      type: Object,
      properties: {
        title: {
          type: String,
          required: true,
        },
        details: {
          type: String,
          required: true,
        },
        image: {
          type: String,
        },
      },
    },
  },
});

module.exports = mongoose.model("trainingSchema", trainingSchema);
