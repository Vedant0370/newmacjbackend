const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const uploadRoutes = require("./routes/TemplateRoutes");
const UserRoutes = require("./routes/UserRoutes");
const multer = require("multer");
const path = require("path");
const Template = require("./model/TempModel");
const response = require("./utils/response");
const InpectionRoutes = require("./routes/InpectionRoutes"); 
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: path.join(__dirname, "./public/uploads/"),
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const PORT = process.env.PORT;
const apiRouter = express.Router();

apiRouter.use("/user", UserRoutes);
apiRouter.use("/template", uploadRoutes);
apiRouter.use("/inspection", InpectionRoutes);

// Serve static files from the uploads directory
app.use("/public/uploads", express.static(path.join(__dirname, "public/uploads")));

app.post("/api/template/upload", upload.fields([{ name: "pdf" }]), async (req, res) => {
  try {
    // Multer middleware will handle file upload and store it in req.file
    const uploadedFile = req.files.pdf;

    // Check if file is uploaded
    if (!uploadedFile) {
      return res.status(400).send("No file uploaded");
    }

    // Create fileInfo object
    const fileInfo = {
      fileName: uploadedFile.filename,
      filePath: `https://macj-backend.onrender.com/public/uploads/${req.files.pdf[0].filename}`
    };

    console.log(fileInfo);

    // Create a new Template instance with data from request body and fileInfo
    const templateInstance = new Template({
      TemplateName: req.body.TemplateName,
      description: req.body.description,
      pdf: fileInfo.filePath,
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
})

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => {
    console.log(e);
  });

app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
