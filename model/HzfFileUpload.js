const mongoose = require('mongoose');

const hzfFileUploadSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    }
});

const HZFLink = mongoose.model('HZFfile', hzfFileUploadSchema);

module.exports = HZFLink;