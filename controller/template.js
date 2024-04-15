const path = require("path");
const Template = require("../model/TempModel");
const response = require("../utils/response");

const uploadFile = async (req, res) => {
  try {
    // Multer middleware will handle file upload and store it in req.file
    const uploadedFile = req.file;

    // Check if file is uploaded
    if (!uploadedFile) {
      return res.status(400).send("No file uploaded");
    }

    // Create fileInfo object
    const fileInfo = {
      fileName: uploadedFile.filename,
      // Constructing the file path using the API link
      filePath: `https://macj-backend.onrender.com/tpz/${uploadedFile.filename}`,
    };

    console.log(fileInfo);

    // Create a new Template instance with data from request body and fileInfo
    const templateInstance = new Template({
      TemplateName: req.body.TemplateName,
      description: req.body.description,
      filePath: fileInfo.filePath,
    });

    // Save the Template instance to the database
    const savedTemplate = await templateInstance.save();

    console.log("Template saved:", savedTemplate);
    // Respond with success message
    res.status(201).json(response(savedTemplate, "Template is created", null));
  } catch (error) {
    console.error("Error saving template:", error);
    // Respond with error message
    res
      .status(500)
      .json(response(null, "Error saving template", error.message));
  }
};


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
  uploadFile,
  getAllTemplate,
  DeleteTemp,
  getById,
};
