const Dish = require('../models/Dishes');

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

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const dish = await Dish.findByIdAndUpdate(id, updates, { new: true });
    if (!dish) {
      return res.status(404).json({ error: "Dish not found" });
    }

    res.json(dish);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const dish = await Dish.findByIdAndDelete(id);
    if (!dish) {
      return res.status(404).json({ error: "Dish not found" });
    }

    res.json({ message: "Dish deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createIngredient = async (req, res) => {
  try {
    const dish = await Dish.findOne({ _id: req.params.dishId });
    if (!dish) return res.status(404).send("Dish not found");

    const ingredientData = {
      ingredient: req.body.ingredient,
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
    const dish = await Dish.findOne({ _id: req.params.dishId });
    if (!dish) return res.status(404).send("Dish not found");

    dish.category = req.body.category;
    await dish.save();
    res.status(200).send("Category assigned to dish");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const removeCategory = async (req, res) => {
  try {
    const dish = await Dish.findOne({ _id: req.params.dishId });
    if (!dish) return res.status(404).send("Dish not found");

    dish.category = null; 
    await dish.save();
    res.status(200).send("Category removed from dish");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const removeIngredient = async (req, res) => {
  try {
    const dish = await Dish.findOne({ _id: req.params.dishId });
    if (!dish) return res.status(404).send("Dish not found");

    dish.ingredients = dish.ingredients.filter(
      (ingredient) => ingredient._id.toString() !== req.params.ingredientId 
    );
    await dish.save();
    res.status(200).send("Ingredient removed from dish");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  create,
  getAll,
  update,
  remove,
  createIngredient,
  createCategory,
  removeCategory,
  removeIngredient,
};