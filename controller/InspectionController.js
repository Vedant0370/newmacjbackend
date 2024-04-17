const response = require("../utils/response") 
const Inpection = require("../model/InspectionModel")
const getAllInpection = async(req ,res )=>{
    try {
        const inpections = await Inpection.find()
        res.status(200).json(response(inpections , "success" , null))
        
    } catch (error) { 
        res.status(500).json(response(null, "error", error.message))
    }
}

const deleteInspection = async (req, res) => {
    try {
        const { inspectionIds } = req.body;
        
        // Use deleteMany method to delete multiple inspections based on IDs
        const deleteManyInspection = await Inpection.deleteMany({ _id: { $in: inspectionIds } });
        
        res.status(200).json(response(deleteManyInspection, "success", null));
    } catch (error) {
        res.status(500).json(response(null, "error", error.message));
    }
};


module.exports = {
    getAllInpection,
    deleteInspection
}
