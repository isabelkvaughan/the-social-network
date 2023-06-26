const { Thought } = require('../models');

module.exports = {
  // Create a reaction for a thought
  async createReaction(req, res) {
    try {
      const { thoughtId } = req.params;
      const { reactionBody, username } = req.body;

      const updatedThought = await Thought.findOneAndUpdate(
        { _id: thoughtId },
        { $push: { reactions: { reactionBody, username } } },
        { new: true }
      );

      if (!updatedThought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(updatedThought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Delete a reaction from a thought
  async deleteReaction(req, res) {
    try {
      const { thoughtId, reactionId } = req.params;

      const updatedThought = await Thought.findOneAndUpdate(
        { _id: thoughtId },
        { $pull: { reactions: { _id: reactionId } } },
        { new: true }
      );

      if (!updatedThought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(updatedThought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
};