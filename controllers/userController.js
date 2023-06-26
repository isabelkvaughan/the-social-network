const { User, Thought } = require('../models');

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find()
      .populate('thoughts') // Populate the thoughts field
      .select('-__v');
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
      .populate('thoughts') // Populate the thoughts field
      .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a user
  async updateUser(req, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a user and associated thoughts
  async deleteUser(req, res) {
    try {
      const deletedUser = await User.findOneAndDelete({ _id: req.params.userId });

      if (!deletedUser) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      await Thought.deleteMany({ _id: { $in: deletedUser.thoughts } });

      res.json({ message: 'User and associated thoughts deleted successfully' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Add a friend to a user
  async addFriend(req, res) {
    try {
      const { userId, friendId } = req.params;

      // Update user A's friends list
      const updatedUserA = await User.findOneAndUpdate(
        { _id: userId },
        { $addToSet: { friends: friendId } }, // Add friend B to user A's friends list
        { new: true }
      );

      if (!updatedUserA) {
        return res.status(404).json({ message: 'No user found with that ID' });
      }

      // Update user B's friends list
      const updatedUserB = await User.findOneAndUpdate(
        { _id: friendId },
        { $addToSet: { friends: userId } }, // Add friend A to user B's friends list
        { new: true }
      );

      if (!updatedUserB) {
        return res.status(404).json({ message: 'No friend found with that ID' });
      }

      res.json(updatedUserA);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

 // Delete a friend from a user
  async deleteFriend(req, res) {
    try {
      const { userId, friendId } = req.params;

      // Update user A's friends list
      const updatedUserA = await User.findOneAndUpdate(
        { _id: userId },
        { $pull: { friends: friendId } }, // Remove friend B from user A's friends list
        { new: true }
      );

      if (!updatedUserA) {
        return res.status(404).json({ message: 'No user found with that ID' });
      }

      // Update user B's friends list
      const updatedUserB = await User.findOneAndUpdate(
        { _id: friendId },
        { $pull: { friends: userId } }, // Remove friend A from user B's friends list
        { new: true }
      );

      if (!updatedUserB) {
        return res.status(404).json({ message: 'No friend found with that ID' });
      }

      res.json(updatedUserA);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
};