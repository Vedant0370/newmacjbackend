const express = require("express");
const uploadController = require("../controller/template");


const router = express.Router();

//   "/uploadTemplate",
//   upload.fields([
//     { name: "pdf", maxCount: 1 },
//   ]),
//   async (req, res) => {
//     try {
//       // Multer middleware will handle file upload and store it in req.file
//       const uploadedFile = req.files.pdf ;
  
//       // Check if file is uploaded
//       if (!uploadedFile) {
//         return res.status(400).send("No file uploaded");
//       }
  
//       // Create fileInfo object
//       const fileInfo = {
//         fileName: uploadedFile.filename,
//       filePath: `http://localhost:7000/public/uploads/${req.files.pdf[0].filename}`
//       };
  
//       console.log(fileInfo);
  
//       // Create a new Template instance with data from request body and fileInfo
//       const templateInstance = new Template({
//         TemplateName: req.body.TemplateName,
//         description: req.body.description,
//         pdf : fileInfo.filePath,
//       });
  
//       // Save the Template instance to the database
//       const savedTemplate = await templateInstance.save();
  
//       console.log("Template saved:", savedTemplate);
//       // Respond with success message
//       res.status(201).json(response(savedTemplate, "Template is created", null));
//     } catch (error) {
//       console.error("Error saving template:", error);
//       // Respond with error message
//       res
//         .status(500)
//         .json(response(null, "Error saving template", error.message));
//     }
//   }
// );
router.get("/", uploadController.getAllTemplate);
router.delete("/:tempId", uploadController.DeleteTemp);
router.get("/:tempId", uploadController.getById);

module.exports = router;
