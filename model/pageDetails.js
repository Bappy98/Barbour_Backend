const mongoose = require('mongoose')

const servicePageDetails = new mongoose.Schema({
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
      order:{
        type:Number
      },
      page_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ServiceSchema',
        required:true
      }
      
})

module.exports = mongoose.model("ServicePageDetails",servicePageDetails)
