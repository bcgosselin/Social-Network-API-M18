const thoughtSchema = new Schema({
    // thoughtText - String - Required - Must be between 1 and 280 characters - createdAt
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    // Date - Set default value to the current timestamp - Use a getter method to format the timestamp on query
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => new Date(timestamp).toLocaleString(),
    },
    
    // username (The user that created this thought) - String  - Required  - reactions (These are like replies)
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema],
},
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
});

// Array of nested documents created with the reactionSchema
thoughtSchema.virtual('reaction').get(function () {
    return this.reactions.length;
});

  const Thought = model('Thought', thoughtSchema);
  
  module.exports = Thought;
  