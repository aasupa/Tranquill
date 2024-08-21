import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    text: {
      type: String,
      default: '',
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    audio: {
      type: String,
      required: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

  export const Notes = mongoose.model("Notes", NoteSchema);