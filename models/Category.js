const mongoose = require("mongoose");

let nextCategoryId = 1;
const getNextCategoryId = () => nextCategoryId++;

const categorySchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // Keep _id as ObjectId
  id: { type: Number, unique: true, default: getNextCategoryId },
  name: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("Category", categorySchema);
