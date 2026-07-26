import mongoose from "mongoose";

const ChatHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    question: String,

    answer: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "ChatHistory",
  ChatHistorySchema
);