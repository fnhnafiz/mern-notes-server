import express, { Request, Response, type Application } from "express";
import { notesRoutes } from "./app/controllers/notes.controllers";
import { userRoutes } from "./app/controllers/users.controllers";
const app: Application = express();

// use middleware
app.use(express.json());

app.use("/notes", notesRoutes);
app.use("/users", userRoutes);
// await Note.bulkSave()
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to new Note App From using Mongoose!!");
});

export default app;
