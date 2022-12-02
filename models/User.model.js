import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: 2,
      lowercase: true,
    },
    bio: { type: String },
    age: {
      type: Number,
      min: 0,
      max: 125,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
    },
    isChef: {
      type: Boolean,
      default: false,
    },

    date: { type: Date, default: Date.now },

    recipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
  },
  {
    timestamps: true,
  }
);

const UserModel = model("User", userSchema);

export default UserModel;
