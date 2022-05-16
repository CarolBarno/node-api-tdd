/* eslint-disable */
const mongoose = require('mongoose');
const { User } = require('../models/user.model');

const getAllUsers = async (req, res) => {
  const users = await User.find({});
  return res.send(users);
};

const getUser = async (req, res) => {
  const userId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(userId)) { return res.status(400).send('Invalid object id'); }
  const user = await User.findById(userId);
  if (!user) { return res.status(404).send('User not found'); }
  return res.send(user);
};

const createUser = async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
  });

  await user.save();
  return res.send(user);
};

const updateUser = async (req, res) => {
  const userId = req.params.id;
  User.findOneAndUpdate(userId, req.body, { new: true })
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send(err));
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  await User.findByIdAndDelete(userId);
  return res.send('User deleted');
};

module.exports = {
  deleteUser, updateUser, createUser, getAllUsers, getUser,
};
