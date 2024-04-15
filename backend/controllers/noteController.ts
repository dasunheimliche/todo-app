import { Note } from "../models/todo-models";
import { addItem, deleteItem, getAll, updateItem } from "../services/services";
import { Request, Response } from "express";

export async function getNotes(_req: Request, res: Response) {
  try {
    const allNotes = await getAll(Note);
    res.status(200).json(allNotes);
  } catch (error) {
    console.error("Error retrieving notes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function addNote(req: Request, res: Response) {
  const { title, description, date, tasks, tags } = req.body;

  if (!title || !description || !date) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const newNote = {
    title,
    description,
    date,
    tasks: tasks || [],
    tags: tags || [],
    archived: false,
  };

  try {
    const savedNewNote = await addItem(Note, newNote);
    res.status(201).json(savedNewNote);
  } catch (error) {
    console.error("Error saving note:", error);
    res.status(500).json({ error: "Failed to save note" });
  }
}

export async function deleteNote(req: Request, res: Response) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Missing note ID" });
  }

  try {
    const deletedNote = await deleteItem(Note, id);

    if (!deletedNote) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json(deletedNote);
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ error: "Failed to delete note" });
  }
}

export async function updateNote(req: Request, res: Response) {
  const noteToUpdate = req.body;

  if (!noteToUpdate || !noteToUpdate.id) {
    return res.status(400).json({ error: "Missing note ID or data" });
  }

  try {
    const updatedNote = await updateItem(Note, noteToUpdate.id, noteToUpdate);

    if (!updatedNote) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json(updatedNote);
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ error: "Failed to update note" });
  }
}
