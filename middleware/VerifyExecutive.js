const response = require("../utils/response")
const Executive = require("../model/ExecutiveModel")


const VerifyUser = async (req, res , next) =>{
    const id = req.headers.id
    if(!id){
        return res.status(400).json(response(null , "please provide id " ,"Userid did not get " ))
    }
    const executive = await Executive.findById(id)
    if(!executive){
        return res.status(400).json(response(null, "Executive not found", "Executive not found"))
    }
    req.executive = executive
    next()
    
}

module.exports = VerifyUser