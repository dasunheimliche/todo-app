import { useEffect, useMemo } from "react";

import Header from "./components/header";
import { ScrollArea } from "./components/ui/scroll-area";
import TagPicker from "./components/tag-picker";
import NoteCard from "./components/noteCard";
import { Separator } from "./components/ui/separator";
import ModeSelector from "./components/modeSelector";
import { useToast } from "./components/ui/use-toast";
import { Toaster } from "./components/ui/toaster";

import { cn } from "./lib/utils";
import useTodoStore from "./stores/useTodoStore";
import { Note, Tag } from "./types";

function App() {
  const { notesList, archivedMode, selectedTag, fetchNotes } = useTodoStore();
  const { toast } = useToast();

  const filteredNotes = useMemo(() => {
    let notes = notesList;

    if (!archivedMode) {
      notes = notes.filter((note) => !note.archived);
    } else {
      notes = notes.filter((note) => note.archived);
    }

    if (selectedTag.text !== "all") {
      notes = notes.filter((note) =>
        note.tags.some((tag: Tag) => tag.text === selectedTag.text)
      );
    }

    return notes;
  }, [notesList, archivedMode, selectedTag]);

  useEffect(() => {
    const fetchNotesAsync = async () => {
      try {
        await fetchNotes();
      } catch (error) {
        toast({ title: "There was an error in getting your notes" });
      }
    };

    fetchNotesAsync();
  }, [fetchNotes, toast]);

  return (
    <main className="max-w-[80rem] max-h-[100dvh] h-[100dvh] ml-auto mr-auto relative bg-black text-zinc-50 p-4 px-5 max-sm:px-2 rounded-[1rem] border-[#1d1d1d] border-[0.5rem] overflow-hidden">
      <Header />
      <div className="bg-white rounded-[1rem] text-[#181A1F] h-[80%] relative overflow-hidden">
        <TagPicker />
        <Separator />
        <ModeSelector />
        <Separator />
        <div className="flex items-stretch relative h-[84%] max-sm:flex-col">
          <ScrollArea
            className={cn("w-full max-sm:w-full m-0 px-3 mt-3 gap-3")}
          >
            <div className="columns-3">
              {filteredNotes.map((note: Note, i: number) => (
                <NoteCard note={note} key={i} />
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
      <Toaster />
    </main>
  );
}

export default App;
