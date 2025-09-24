import express, { Request, Response } from "express";
import { Note } from "../models/notes.model";

export const notesRoutes = express.Router();
notesRoutes.post("/create-note", async (req: Request, res: Response) => {
  // notesRoutesroch 1
  //   const newNote = new Note({
  //     title: "Learning Typescript",
  //     // description: "I am learing Express with typescript and express js",
  //   });

  //   await newNote.save();
  // notesRoutesroch 2
  const body = req.body;
  const note = await Note.create(body);
  res.status(201).json({
    success: true,
    message: "Create your note successfully!!",
    note: note,
  });
});

notesRoutes.get("/", async (req: Request, res: Response) => {
  const notes = await Note.find({}).populate("user");
  res.status(201).json({
    success: true,
    message: "get all notes here",
    notes: notes,
  });
});
notesRoutes.get("/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;
  console.log(noteId);
  const notes = await Note.findById(noteId);
  res.status(201).json({
    success: true,
    message: "get single note",
    notes: notes,
  });
});
notesRoutes.patch("/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;
  const newNotes = req.body;
  //   updated system 1
  //   const updatedNote = await Note.findByIdAndUpdate(noteId, newNotes, {
  //     new: true,
  //   });
  //   updated system 2
  //   const updatedNote = await Note.findOneAndUpdate({ _id: noteId }, newNotes, {
  //     new: true,
  //   });
  //   updated system 3
  const updatedNote = await Note.updateOne({ _id: noteId }, newNotes);
  res.status(201).json({
    success: true,
    message: "Updated successfully",
    updatedNote: updatedNote,
  });
});
notesRoutes.delete("/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;
  const deletedNote = await Note.findByIdAndDelete(noteId);
  res.status(201).json({
    success: true,
    message: "Notes delete successfully",
    acknolegeTrue: deletedNote,
  });
});
