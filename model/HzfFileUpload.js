const mongoose = require('mongoose');

const hzfFileUploadSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
      },
      originalFileName: {
        type: String,
        required: true // Ensure originalFileName is required
      },
      // inspectionName : {
      //   type : String,
      //   required : [true, "Inspection Name Is Required"]
      // },
      clientName : {
        type : String,
        required : [true , "Client Name Is Required"]
      },
      inspectionAddress : {
        type : String,
        required : [true, "Inspection Address Is required"]
      },
      // date : {
      //   type : String,
      //   required : [true, "Date Is Required"]
      // }

    });


const HZFLink = mongoose.model('HZFLink', hzfFileUploadSchema);

module.exports = HZFLink;
