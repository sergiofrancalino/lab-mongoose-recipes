import express from "express";
import RecipeModel from "../models/Recipe.model.js";

const recipeRoute = express.Router();
//HERE THE ROUTES

// Iteration 2 - Create a recipe
recipeRoute.post("/create-recipe", async (req, res) => {
  try {
    const form = req.body;
    const newRecipe = await RecipeModel.create(form);
    return res.status(201).json(newRecipe);
  } catch (error) {
    console.log(error.errors);
    return res.status(500).json(error.errors);
  }
});

//Iteration 3 - Insert multiple recipes
recipeRoute.post("/create-many", async (req, res) => {
  try {
    const form = req.body;
    const newRecipe = await RecipeModel.create(form);
    form.forEach((recipe) => {
      console.log(recipe.title, "create many, title");
    });
    return res.status(201).json(newRecipe);
  } catch (error) {
    console.log(error.errors);
    return res.status(500).json(error.errors);
  }
});

//Iteration 4 - Update recipe
//The Rigatoni alla Genovese does not take that long
recipeRoute.put("/edit-duration/", async (req, res) => {
  try {
    const { title, duration } = req.body;
    console.log(title, duration, "<-title/duration");
    const updateRecipe = await RecipeModel.findOneAndUpdate(
      { title: title },
      { duration: duration },
      { new: true, runValidators: true }
    );
    console.log(updateRecipe, "<---updated");
    return res.status(200).json(updateRecipe);
  } catch (error) {
    console.log(error.errors);
    return res.status(500).json(error.errors);
  }
});

//Iteration 5 - Remove a recipe
recipeRoute.delete("/delete-title/", async (req, res) => {
  try {
    console.log(req.body);

    //Using the Model.deleteOne method
    const deleteRecipe = await RecipeModel.deleteOne(req.body);
    if (!deleteRecipe) {
      return res.status(400).json({ msg: "Recipe not found" });
    }

    //remove that recipe from the database and display a success
    const recipe = await RecipeModel.find();
    console.log("Recipe deleted");
    return res.status(200).json(recipe);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
});

export default recipeRoute;
