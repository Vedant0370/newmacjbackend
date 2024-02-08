const path = require("path");
const Template = require("../model/TempModel");
const response = require("../utils/response");

const uploadFile = async (req, res) => {
  const uploadedFile = req.file;

  if (!uploadedFile) {
    return res.status(400).send("No file uploaded");
  }

  const fileInfo = {
    fileName: uploadedFile.filename,
    filePath: path.join(__dirname, "../tpz", uploadedFile.filename),
  };

  try {
    const templateInstance = new Template({
      TemplateName: req.body.TemplateName,
      description: req.body.description,
      filePath: fileInfo.filePath,
    });

    const savedTemplate = await templateInstance.save();

    console.log("Template saved:", savedTemplate);
    res.status(201).json(response(savedTemplate, "template is created", null));
  } catch (error) {
    console.error("Error saving template:", error);
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
