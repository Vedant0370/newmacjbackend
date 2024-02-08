const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const uploadRoutes = require("./routes/TemplateRoutes");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 7000;

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => {
    console.log(e);
  });

app.use("/api", uploadRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
