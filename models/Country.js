const mongoose = require('mongoose');

let nextCountryId = 1;
const getNextCountryId = () => nextCountryId++;
// const countrySchema = new mongoose.Schema({
//   name: { type: String, required: true },
// });
const countrySchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // Keep _id as ObjectId
    id: { type: Number, unique: true, default: getNextCountryId },
    name: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('Country', countrySchema);