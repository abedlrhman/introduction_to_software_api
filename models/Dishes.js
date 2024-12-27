const mongoose = require("mongoose");

let nextDishId = 1;
const getNextDishId = () => nextDishId++;

const DishSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // Keep _id as ObjectId
    id: { type: Number, unique: true, default: getNextDishId },
    name: { type: String, required: true, unique: true },
    country: { type: Number, ref: 'Country', required: true },
    cookingTime: String,
    ingredients: [{
        ingredient: { type: Number, ref: 'Ingredient', required: true },
        amount: String,
    }],
    category: { type: Number, ref: 'Category' },
    recipe: String,
});
module.exports = mongoose.model("Dish", DishSchema);
