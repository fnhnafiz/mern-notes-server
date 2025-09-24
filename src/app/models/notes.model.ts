import { model, Schema } from "mongoose";
import { INotes } from "../interfaces/notes.interface";

// here is schema
const noteSchema = new Schema<INotes>(
  {
    title: { type: String, required: true, trim: true },
    description: {
      type: String,
      default: "Work daily and you can shine your life",
    },
    category: {
      type: String,
      enum: ["personal", "work", "gym", "other"],
      default: "personal",
    },
    pinned: {
      type: Boolean,
      default: false,
    },
    tags: {
      label: { type: String, required: true },
      color: { type: String, default: "Blue" },
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Note = model<INotes>("Note", noteSchema, "myAllNotes");
