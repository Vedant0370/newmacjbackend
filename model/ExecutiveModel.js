const mongoose = require("mongoose")


const ExecutiveSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    designation: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },


})

const ExecutiveModel = mongoose.model("executive", ExecutiveSchema)
module.exports = ExecutiveModel