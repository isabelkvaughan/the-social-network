const { Schema, model } = require('mongoose');

// Schema to create Thought model
const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // reactions: [reactionSchema],
},
{
  toJSON: {
    getters: true,
    virtuals: true,
  },
  id: false,
}
);

// Create a virtual property `reactionCount` that gets the thought's reaction count
// thoughtSchema
//   .virtual('reactionCount')
//   .get(function () {
//     return this.reaction.length;
// });

// Initialize our Thought model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;