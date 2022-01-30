const mongoose = require("mongoose");
const { Schema } = mongoose;

const ReportSchema = new Schema({
  method: String,
  url: String,
  requestBody: Object,
  result: String,
  success: Boolean,
  date: String,
  time: String,
});

const Report = mongoose.model("Report", ReportSchema);

module.exports = Report;
