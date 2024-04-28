const mongoose = require("mongoose");

const servicesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  image: {
    type: String,
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
        body: {
          type: String,
          required: true,
        },
        image: {
          type: String,
        },
        tags: {
          type: Array,
          items: {
            type: String,
          },
        },
      },
    },
  },
});

module.exports = mongoose.model("serviceSchema", servicesSchema);
