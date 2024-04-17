const mongoose = require('mongoose');

const inpectionSchema = mongoose.Schema({
    InspectionName : {
        type : String,
    },

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
    InpectionDate : {
        type : Date,
        default : Date.now
    }
    ,
    pdf:{
        type : String,
        required : true
    }


})

const inspection = mongoose.model('inspection',inpectionSchema);
module.exports = inspection;
