import express from 'express';
import UserModel from '../models/User.model.js';
import RecipeModel from '../models/Recipe.model.js';

const userRoute = express.Router();

//CREATE
userRoute.post('/create', async (req, res) => {
  try {
    const form = req.body;

    const newUser = await UserModel.create(form);

    return res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
});

// READ
userRoute.get('/read/:id', async (req, res) => {
  try {
    const { id } = req.params;
   
    const user = await UserModel.findById(id).populate('recipes');
   
    if (!user) {
      return res.status(400).json({ msg: ' User not found!' });
    }

    return res.status(200).json(user);
    //
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
});

//UPDATE USER
userRoute.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true }
    );

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
});

//DELETE
userRoute.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await UserModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(400).json({ msg: 'Usuário não encontrado!' });
    }

    const users = await UserModel.find();

    await RecipeModel.deleteMany({ creator: id });

    return res.status(204).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
});

export default userRoute;