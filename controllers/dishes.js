const Dish = require("../models/Dishes");

const create = async (req, res) => {
  try {
    const newDish = new Dish(req.body);
    const savedDish = await newDish.save();
    res.status(201).json(savedDish);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAll = async (req, res) => {
  try {
    const dishes = await Dish.find()
      .populate("country")
      .populate("ingredients.ingredient")
      .populate("category");
    res.json(dishes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createIngradient = async (req, res) => {
  try {
    const dish = await Dish.findOne({ id: parseInt(req.params.dishId) }); // Parse dishId to integer
    if (!dish) return res.status(404).send("Dish not found");

    const ingredientData = {
      ingredient: parseInt(req.body.ingredient), // Parse ingredient to integer
      amount: req.body.amount,
    };
    dish.ingredients.push(ingredientData);
    await dish.save();
    res.status(200).send("Ingredient added to dish");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const dish = await Dish.findOne({ id: parseInt(req.params.dishId) }); // Parse dishId to integer
    if (!dish) return res.status(404).send("Dish not found");

    dish.category = parseInt(req.body.category); // Parse category to integer
    await dish.save();
    res.status(200).send("Category assigned to dish");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  create,
  getAll,
  createIngradient,
  createCategory,
};
