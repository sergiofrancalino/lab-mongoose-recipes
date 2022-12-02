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

//Iteration 5 - Remove a recipe using findByIDAndDelete()
recipeRoute.delete("/delete-title/:id", async (req, res) => {
  try {
    console.log(req.body);
    const { id } = req.params;

    // Using the Model.deleteOne method
    // const deleteRecipe = await RecipeModel.deleteOne(req.body);

    // Using the findByIDAndDelete
    const deleteRecipe = await RecipeModel.findByIdAndDelete(id);

    //Case the id don't found in collection
    if (!deleteRecipe) {
      return res.status(400).json({ msg: "Recipe not found" });
    }

    return res.status(200).json(deleteRecipe);
    
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
});

export default recipeRoute;
