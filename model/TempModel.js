const mongoose = require("mongoose");

const TemplateSchema = new mongoose.Schema({
  TemplateName: {
    type: String,
  },
  description: {
    type: String,
  },

  filePath: {
    type: String,
    required: true,
  },
});

const Template = mongoose.model("Template", TemplateSchema);
module.exports = Template;
