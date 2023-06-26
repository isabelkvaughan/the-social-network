const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,20}(?:\.[a-z]{2})?)$/i,
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought',
    },
  ],
  // friends: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: 'User',
  //   },
  // ],
  //   toJSON: {
  //     virtuals: true,
  //   },
  //   id: false,
  }
);

// Create a virtual property `friendCount` that gets the user's friend count
// userSchema
//   .virtual('friendCount')
//   .get(function () {
//     return this.friends.length;
// });

// Initialize our User model
const User = model('User', userSchema);

module.exports = User;