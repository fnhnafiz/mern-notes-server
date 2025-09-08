import express, { Request, Response, type Application } from "express";
import { model, Schema } from "mongoose";
const app: Application = express();

// use middleware
app.use(express.json());

// here is schema
const noteSchema = new Schema({
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
});

const Note = model("Note", noteSchema, "myAllNotes");

app.post("/notes/create-note", async (req: Request, res: Response) => {
  // approch 1
  //   const newNote = new Note({
  //     title: "Learning Typescript",
  //     // description: "I am learing Express with typescript and express js",
  //   });

  //   await newNote.save();
  // approch 2
  const body = req.body;
  const note = await Note.create(body);
  res.status(201).json({
    success: true,
    message: "Create your note successfully!!",
    note: note,
  });
});

app.get("/notes", async (req: Request, res: Response) => {
  const notes = await Note.find({});
  res.status(201).json({
    success: true,
    message: "get all notes here",
    notes: notes,
  });
});
app.get("/notes/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;
  console.log(noteId);
  const notes = await Note.findById(noteId);
  res.status(201).json({
    success: true,
    message: "get single note",
    notes: notes,
  });
});
app.patch("/notes/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;
  const newNotes = req.body;
  const updatedNote = await Note.findByIdAndUpdate(noteId, newNotes, {
    new: true,
  });
  res.status(201).json({
    success: true,
    message: "Updated successfully",
    updatedNote: updatedNote,
  });
});
// await Note.bulkSave()
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to new Note App From using Mongoose!!");
});

export default app;
