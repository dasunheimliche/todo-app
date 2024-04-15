import express from "express";
import {
  addNote,
  deleteNote,
  updateNote,
  getNotes,
} from "../controllers/noteController";

const noteRouter = express.Router();

noteRouter.get("/", getNotes);
noteRouter.post("/", addNote);
noteRouter.delete("/:id", deleteNote);
noteRouter.patch("/", updateNote);

export default noteRouter;
