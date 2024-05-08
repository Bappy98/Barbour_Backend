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
  details:{
    type:String,
  },
  image: {
    type: String,
  },
  pageDetails: [
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"ServicePageDetails"
    }
  ]
});

module.exports = mongoose.model("ServiceSchema", servicesSchema);
