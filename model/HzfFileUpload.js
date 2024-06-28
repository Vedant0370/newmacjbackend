const mongoose = require('mongoose');

const hzfFileUploadSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
      },
      originalFileName: {
        type: String,
        required: true
      },
      clientName : {
        type : String,
        required : [true , "Client Name Is Required"]
      },
      inspectionAddress : {
        type : String,
        required : [true, "Inspection Address Is required"]
      },
      date : {
        type : String,
        
      }

    });


const HZFLink = mongoose.model('HZFLink', hzfFileUploadSchema);

module.exports = HZFLink;
