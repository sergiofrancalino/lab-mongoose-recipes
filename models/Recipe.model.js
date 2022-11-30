import { Schema, model } from "mongoose";

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      minlength: 2,
      maxlength: 18,
      lowercase: true,
    },
    level: {
      type: String,
      enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"],
      default: "Easy Peasy",
      lowercase: true,
    },
    ingredients: [{ type: String }],
    cuisine: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 25,
    },
    dishType: {
      type: String,
      enum: [
        "breakfast",
        "main course",
        "soup",
        "snack",
        "drink",
        "dessert",
        "other",
      ],
      default: "breakfast",
    },
    image: {
      type: String,
      default: "https://images.media-allrecipes.com/images/75131.jpg",
    },
    duration: {
      type: Number,
      min: 0,
      max: 60,
    },
    creator: {
      type: String,
      minlength: 2,
      maxlength: 20,
    },
    created: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const RecipeModel = model("Recipe", recipeSchema);

export default RecipeModel;
