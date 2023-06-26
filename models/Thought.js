const { Schema, model } = require('mongoose');

// Reaction Schema
const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId()
  },
  reactionBody: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Schema to create Thought model
const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
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
  reactions: [reactionSchema],
},
{
  toJSON: {
    getters: true,
    virtuals: true,
    versionKey: false,
  },
  id: false,
}
);

// Create a virtual property `reactionCount` that gets the thought's reaction count
thoughtSchema
  .virtual('reactionCount')
  .get(function () {
    return this.reactions.length;
});

// Initialize our Thought model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;