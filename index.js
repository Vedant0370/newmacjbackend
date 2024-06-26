//imports
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const http = require("http");
require("dotenv").config();

//function import
const response = require("./utils/response");

//models imports
const Template = require("./model/TempModel");
const inspection = require("./model/InspectionModel");
const HZFLink = require("./model/HzfFileUpload");

//routes imports
const uploadRoutes = require("./routes/TemplateRoutes");
const UserRoutes = require("./routes/UserRoutes");
const InpectionRoutes = require("./routes/InpectionRoutes");
const ExecutiveRoutes = require("./routes/ExecutiveRoutes");

//declearation
const app = express();
app.use(cors());
// app.use(express.json());
app.use(express.json({ limit: "50mb" })); // Increase limit to 50mb
app.use(express.urlencoded({ limit: "50mb", extended: true }));
const apiRouter = express.Router();
const PORT = process.env.PORT;

//routes
apiRouter.use("/user", UserRoutes);
apiRouter.use("/template", uploadRoutes);
apiRouter.use("/inspection", InpectionRoutes);
apiRouter.use("/executive", ExecutiveRoutes);

//multer for file & image upload
const uploadDirectory = path.join(__dirname, "public/uploads");

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const storage = multer.diskStorage({
  destination: path.join(__dirname, "./public/uploads/"),
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use("/public/uploads", express.static(uploadDirectory));
app.use(
  "/public/uploads",
  express.static(path.join(__dirname, "public/uploads"))
);

app.post("/api/newinspection/upload", async (req, res) => {
  try {
    const {
      url,
      originalFileName,
      // inspectionName,
      clientName,
      inspectionAddress,
      // date,
    } = req.body;

    if (!url || !originalFileName) {
      return res
        .status(400)
        .json({ message: "URL or originalFileName not provided" });
    }

    // Extract base64 data from the data URL
    const base64Data = url.replace(
      /^data:application\/octet-stream;base64,/,
      ""
    );

    // Generate the file name based on originalFileName
    const fileName = `${originalFileName}.hzf`;
    const filePath = path.join(uploadDirectory, fileName);

    // Save the file
    fs.writeFileSync(filePath, base64Data, "base64");

    // handle validation for the required fields
    // if(!inspectionName){
    //   return res.status(404).json({ message: HZFLink.schema.paths.inspectionName.options.required[1] })
    // }
    if (!clientName) {
      return res
        .status(404)
        .json({ message: HZFLink.schema.paths.clientName.options.required[1] });
    }
    if (!inspectionAddress) {
      return res.status(404).json({
        message: HZFLink.schema.paths.inspectionAddress.options.required[1],
      });
    }
    // if(!date){
    //   return res.status(404).json({ message: HZFLink.schema.paths.date.options.required[1] })
    // }
    // Save the file path and original file name to the database
    const newFile = new HZFLink({
      url: `http://localhost:${PORT}/public/uploads/${fileName}`,
      originalFileName: originalFileName,
      // inspectionName: inspectionName,
      clientName: clientName,
      inspectionAddress: inspectionAddress,
      // date: date,
    });
    await newFile.save(); // Save to MongoDB

    // Return success response with the file details
    res
      .status(200)
      .json({ message: "File uploaded successfully", file: newFile });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/inspection", async (req, res) => {
  try {
    const files = await HZFLink.find({}, "-__v"); // Exclude __v field from response
    res.json(files);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post(
  "/api/template/upload",
  upload.fields([{ name: "pdf" }]),
  async (req, res) => {
    try {
      // Multer middleware will handle file upload and store it in req.file
      const uploadedFile = req.files.pdf;
      console.log(uploadedFile);
      console.log(req.body);
      // Check if file is uploaded
      if (!uploadedFile) {
        return res.status(400).send("No file uploaded");
      }

      // Create fileInfo object
      const fileInfo = {
        fileName: uploadedFile.filename,
        filePath: `http://localhost:7000/public/uploads/${req.files.pdf[0].filename}`,
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
      res
        .status(201)
        .json(response(savedTemplate, "Template is created", null));
    } catch (error) {
      console.error("Error saving template:", error);
      // Respond with error message
      res
        .status(500)
        .json(response(null, "Error saving template", error.message));
    }
  }
);

app.post(
  "/api/inspection/upload",
  upload.fields([{ name: "pdf" }]),
  async (req, res) => {
    try {
      const {
        clientName,
        email,
        phone,
        address,
        InpectionDate,
        InspectionName,
      } = req.body;
      // Multer middleware will handle file upload and store it in req.file
      const uploadedFile = req.files.pdf;

      // Check if file is uploaded
      if (!uploadedFile) {
        return res.status(400).send("No file uploaded");
      }

      // Create fileInfo object
      const fileInfo = {
        fileName: uploadedFile.filename,
        filePath: `http://localhost:7000/public/uploads/${req.files.pdf[0].filename}`,
      };

      console.log(fileInfo);

      // Create a new Template instance with data from request body and fileInfo
      const InspectionInstace = new inspection({
        InspectionName: InspectionName || "",

        clientName: clientName,
        email: email || null,
        phone: phone || null,
        address: address || null,
        InpectionDate: InpectionDate,
        pdf: fileInfo.filePath,
      });

      // Save the Template instance to the database
      const savedTemplate = await InspectionInstace.save();

      console.log("Template saved:", savedTemplate);
      // Respond with success message
      res
        .status(201)
        .json(response(savedTemplate, "Template is created", null));
    } catch (error) {
      console.error("Error saving template:", error);
      // Respond with error message
      res
        .status(500)
        .json(response(null, "Error saving template", error.message));
    }
  }
);

// app.post('/api/newinspection/upload', async (req, res) => {
//   try {
//       const { url} = req.body;

//       if (!url) {
//           return res.status(400).json({ message: 'No URL provided' });
//       }

//       // Extract base64 data from the data URL
//       const base64Data = url.replace(/^data:application\/octet-stream;base64,/, '');

//       // Define the file path
//       const fileName = `inspection_${Date.now()}.hzf`;
//       const filePath = path.join(__dirname, 'public/uploads', fileName);

//       // Save the file
//       fs.writeFileSync(filePath, base64Data, 'base64');

//       // Save the file path to the database
//       const newFile = new HZFLink({ url: `http://localhost:7000/public/uploads/${fileName}` },);
//       await newFile.save();

//       res.status(200).json({ message: 'File uploaded successfully', link: newFile.url });
//   } catch (e) {
//       console.error(e);
//       res.status(500).json({ message: 'Internal server error' });
//   }
// });

// app.post('/api/newinspection/upload', async (req, res) => {
//   try {
//     const { url, originalFileName } = req.body;

//     if (!url || !originalFileName) {
//       return res.status(400).json({ message: 'URL or originalFileName not provided' });
//     }

//     // Extract base64 data from the data URL
//     const base64Data = url.replace(/^data:application\/octet-stream;base64,/, '');

//     // Generate a unique file name
//     const fileName = `${uuidv4()}.hzf`; // Use UUID to generate a unique file name
//     const filePath = path.join(__dirname, '../public/uploads', fileName);

//     // Save the file
//     fs.writeFileSync(filePath, base64Data, 'base64');

//     // Save the file path and original file name to the database
//     const newFile = new HZFLink({
//       url: `http://localhost:7000/public/uploads/${fileName}`,
//       originalFileName: originalFileName
//     });
//     await newFile.save();

//     res.status(200).json({ message: 'File uploaded successfully', link: newFile.url });
//   } catch (e) {
//     console.error(e);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

//connection

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => {
    console.log(e);
  });

app.use("/api", apiRouter);

//start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
