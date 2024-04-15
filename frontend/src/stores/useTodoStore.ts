import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Note, Tags, Tag } from "../types";

interface TodoStore {
  notesList: Note[];
  selectedTag: Tag;
  tags: Tags;
  archivedMode: boolean;
  setArchivedMode: (mode: boolean) => void;
  setSelectedTag: (tag: Tag) => void;
  addNote: (note: Note) => void;
  addTags: (tags: Tag[]) => void;
  updateNote: (id: string, updatedNote: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  fetchTags: () => void;
  fetchNotes: () => void;
}

const useTodoStore = create<TodoStore>()(
  persist<TodoStore>(
    (set) => ({
      notesList: [],
      selectedTag: { id: "all", text: "all" },
      tags: [{ id: "all", text: "all" }],
      archivedMode: false,
      setArchivedMode: (mode) => set({ archivedMode: mode }),
      setSelectedTag: (tag: Tag) => set({ selectedTag: tag }),
      addTags: (tags: Tag[]) =>
        set((state) => ({ tags: [...state.tags, ...tags] })),
      addNote: (note) =>
        set((state) => ({ notesList: [...state.notesList, note] })),
      updateNote: (id, updatedNote) =>
        set((state) => ({
          notesList: state.notesList.map((note) =>
            note.id === id ? { ...note, ...updatedNote } : note
          ),
        })),
      deleteNote: (id) =>
        set((state) => ({
          notesList: state.notesList.filter((note) => note.id !== id),
        })),
      fetchTags: async () => {
        try {
          const res = await fetch("http://localhost:8000/api/tags");
          const tags = await res.json();
          set((state) => ({ tags: [{ id: "all", text: "all" }, ...tags] }));
        } catch (error) {
          console.error(error);
        }
      },
      fetchNotes: async () => {
        try {
          const res = await fetch("http://localhost:8000/api/notes");
          const notes = await res.json();
          set((state) => ({ notesList: [...notes] }));
        } catch (error) {
          console.error(error);
        }
      },
    }),
    {
      name: "todo-store",
    }
  )
);

export default useTodoStore;
