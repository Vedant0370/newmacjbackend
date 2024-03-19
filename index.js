const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const uploadRoutes = require("./routes/TemplateRoutes");
const UserRoutes = require("./routes/UserRoutes");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;
const apiRouter = express.Router();

apiRouter.use("/user", UserRoutes);
apiRouter.use("/template", uploadRoutes);

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

app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
