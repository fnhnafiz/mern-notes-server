import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";

let server: Server;
const PORT = 8080;

async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://noteapp:noteapp@cluster0.udh1k.mongodb.net/my-note-database?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Mongose connected!!");
    server = app.listen(PORT, () => {
      console.log(`App listening on port ${PORT} 🥰 ✅`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();
