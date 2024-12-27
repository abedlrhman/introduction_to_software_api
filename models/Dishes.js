const mongoose = require("mongoose");


const DishSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    country: { type: String, ref: 'Country', required: true },
    cookingTime: String,
    ingredients: [{
        ingredient: { type: String, ref: 'Ingredient', required: true },
        amount: String,
    }],
    category: { type: String, ref: 'Category' },
    recipe: String,
});
module.exports = mongoose.model("Dish", DishSchema);
