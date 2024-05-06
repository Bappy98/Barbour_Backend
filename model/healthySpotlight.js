const mongoose = require("mongoose");

const healthySpotlight = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    details: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: null, // assuming URL to an image
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["active", "draft"],
      default: "active",
    },
    // category: {
    //   type: String,
    //   required: true,
    //   trim: true,
    // },
    // tags: [
    //   {
    //     type: String,
    //     trim: true,
    //   },
    // ],
    //status: { type: String, default: "posted" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("healthySpotlight", healthySpotlight);
