const { Schema, model, Types } = require("mongoose");

// Child/subdocuments can be embedded into a parent document
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Types,
      ObjectId,
      default: new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: function (timestamp) {
        const options = {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        };
        return timestamp.toLocaleString("en-US", options);
      },
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

