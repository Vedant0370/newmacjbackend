const express = require("express")
const response = require("../utils/response")
const ExecutiveModel = require("../model/ExecutiveModel")
const bcrypt = require("bcrypt")
require("dotenv").config()


const Ragister = async(req,res)=>{
    const {name , email , password , designation , phone , address } = req.body 

    try {
        const UserEmailExist = await ExecutiveModel.findOne({email})
        if(UserEmailExist){
            return res.status(400).json(response(null , "email Already exist " , "email exist ")) 
        }
        const UserPhoneExist = await ExecutiveModel.findOne({phone})
        if(UserPhoneExist){
            return res.status(400).json(response(null, "phone Already exist ", "phone exist "))
        }
        console.log(process.env.SALT)
        const hashPassword = await bcrypt.hash(password,parseInt(process.env.SALT))
        const executive = await ExecutiveModel.create({name , email , password :hashPassword , designation , phone , address })
         res.status(200).json(response(executive, "Executive Ragister Successfully", null ))
        
    } catch (error) {
        res.status(400).json(response(null, "Executive Ragister Failed", error.message))
        
    }
}

const LoginExecutive = async(req, res)=>{
    try {
        const executive = await ExecutiveModel.findOne({email: req.body.email})
        if(!executive){
            return res.status(400).json(response(null, "Email Not Found", "Email Not Found"))
        }
        const isMatch = await bcrypt.compare(req.body.password, executive.password)
        if(!isMatch){
            return res.status(400).json(response(null, "Password Not Match", "Password Not Match"))
        }
        res.status(200).json(response(executive, "Login Successfully", null))
        
        
    } catch (error) {
        res.status(400).json(response(null, "Login Failed", error.message))
        
    }
}

const DeleteExecutive = async(req, res)=>{
    try {
        const executive = await ExecutiveModel.findByIdAndDelete(req.params.id)
        res.status(200).json(response(executive, "Executive Deleted Successfully", null))

    } catch (error) {
        res.status(400).json(response(null, "Executive Delete Failed", error.message))

    }
}

const updateExecutive = async(req, res)=>{
    try {
        if(req.body.password){
           return res.status(400).json(response(null, "Password can't be Update here ", "Password can't be Update here "))
        }
        const executive = await ExecutiveModel.findByIdAndUpdate(req.params.id, req.body, {new : true})
        res.status(200).json(response(executive, "Executive Updated Successfully", null))

    } catch (error) {
        res.status(400).json(response(null, "Executive Update Failed", error.message))

    }
    
}

const getAllExecutive = async(req, res)=>{
    try {
        const executive = await ExecutiveModel.find()
        res.status(200).json(response(executive, "Executive Get Successfully", null))

    } catch (error) {
        res.status(400).json(response(null, "Executive Get Failed", error.message))

    }
}

const getExecutiveById = async(req, res)=>{
    try {
        const executive = await ExecutiveModel.findById(req.params.id)
        res.status(200).json(response(executive, "Executive Get Successfully", null))

    } catch (error) {
        res.status(400).json(response(null, "Executive Get Failed", error.message))

    }
}


module.exports = {
    Ragister,
    LoginExecutive,
    DeleteExecutive , 
    updateExecutive , 
    getAllExecutive,
    getExecutiveById
}