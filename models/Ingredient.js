const mongoose = require('mongoose');

let nextIngredientId = 1;
const getNextIngredientId = () => nextIngredientId++;

const ingredientSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // Keep _id as ObjectId
    id: { type: Number, unique: true, default: getNextIngredientId },
    name: { type: String, required: true, unique: true },
} );

module.exports = mongoose.model('Ingredient', ingredientSchema);