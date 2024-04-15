const mongoose = require('mongoose');

const inpectionSchema = mongoose.Schema({

    clientName : {
        type : String,
        required : true
    }
    ,
    phone:{
        type : Number,

    },
    email : {
        type : String,

    },
    address : {
        type : String,

    }
    ,
    pdf:{
        type : String,
        required : true
    }


})

const inspection = mongoose.model('inspection',inpectionSchema);
module.exports = inspection;