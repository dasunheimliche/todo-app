import { addItem, getAll } from "../services/services";
import { Tag } from "../models/todo-models";
import { Request, Response } from "express";

export async function getTags(_req: Request, res: Response) {
  try {
    const allTags = await getAll(Tag);
    res.json(allTags);
  } catch (error) {
    console.error("Error getting tags:", error);
    res.status(500).json({ error: "Failed to get tags" });
  }
}

export async function addTag(req: Request, res: Response) {
  const bodyTags = req.body;

  if (!Array.isArray(bodyTags) || bodyTags.length === 0) {
    return res.status(400).json({ error: "Invalid or missing tags" });
  }

  try {
    const allTags = await getAll(Tag);
    const allTagNames = allTags.map((t: any) => t.text);
    const newTags: any[] = [];

    const addedTags = await Promise.all(
      bodyTags.map(async (t: any) => {
        if (!allTagNames.includes(t.text)) {
          const createdTag = await addItem(Tag, { text: t.text });
          newTags.push(createdTag);
          return createdTag;
        } else {
          return t;
        }
      })
    );

    res.json({ allTags: addedTags, newTags });
  } catch (error) {
    console.error("Error adding tags:", error);
    res.status(500).json({ error: "Failed to add tags" });
  }
}
