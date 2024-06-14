const mongoose = require('mongoose');

const hzfFileUploadSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
      },
      originalFileName: {
        type: String,
        required: true // Ensure originalFileName is required
      }
    });


const HZFLink = mongoose.model('HZFLink', hzfFileUploadSchema);

module.exports = HZFLink;
