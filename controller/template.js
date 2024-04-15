const Template = require("../model/TempModel");
const response = require("../utils/response");


const getAllTemplate = async (req, res) => {
  try {
    const templates = await Template.find();
    res.status(200).json(response(templates, "success", null));
  } catch (error) {
    res.status(500).json(response(null, "error", error.message));
    console.log(error);
  }
};

const DeleteTemp = async (req, res) => {
  try {
    const tempId = req.params.tempId;
    const temp_delete = await Template.findByIdAndDelete(tempId);
    res.status(200).json(response(temp_delete, "success", null));
  } catch (error) {
    res.status(500).json(response(null, "error", error.message));
  }
};

const getById = async (req, res) => {
  try {
    const tempId = req.params.tempId;
    const temp = await Template.findById(tempId);
    res.status(200).json(response(temp, "success", null));
  } catch (error) {
    res.status(500).json(response(null, "error", error.message));
  }
};

module.exports = {
  getAllTemplate,
  DeleteTemp,
  getById,
};
