const { User, Thought } = require("../models");

module.exports = {
  //GET all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  //GET one user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  //POST a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  //PUT/UPDATE a user by _id
  updateUser(req, res) {
    User.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  //DELETE a user by _id
  deleteUser(req, res) {
    User.findByIdAndDelete(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  //POST a friend
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
      .then((data) => {
        if (!data) {
          return res
            .status(404)
            .json({ message: "No user found with given ID" });
        }
        return res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  //DELETE a friend
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((data) => {
        if (!data) {
          return res
            .status(404)
            .json({ message: "No user found with given ID" });
        }
        return res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
};
