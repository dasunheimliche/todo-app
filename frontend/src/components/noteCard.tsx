import { Note, Task } from "@/types";
import useTodoStore from "../stores/useTodoStore";
import DeleteAlertDialog from "./delete-alert-dialog";
import EditDialog from "./edit-dialog";
import { CheckedState } from "@radix-ui/react-checkbox";

import moment from "moment";
import "moment/locale/es";
import { Checkbox } from "./ui/checkbox";
import ModalTrigger from "./ui/modal-trigger";
import { Bomb, SquarePen, Archive } from "lucide-react";
import { useState } from "react";
import { Separator } from "./ui/separator";
import ArchiveAlertDialog from "./archive-alert-dialog";
import { useToast } from "./ui/use-toast";
import { deleteBdNote, updateBdNote } from "@/lib/services";

moment.locale("es");

export default function NoteCard({ note }: { note: Note }) {
  const { deleteNote, updateNote } = useTodoStore();
  const { toast } = useToast();

  async function handleDeleteNote() {
    try {
      const { error } = await deleteBdNote(note.id);

      if (error) {
        toast({ title: "There was a problem deleting your note" });
        return;
      }
      toast({ title: "Your note was deleted succesfully" });
      deleteNote(note.id);
    } catch (error) {
      toast({ title: "There was a problem deleting your note" });
    }
  }

  async function handleArchiveNote() {
    try {
      const copiedNote = { ...note, archived: !note.archived };

      const updatedNote = await updateBdNote(copiedNote);
      toast({ title: "Note updated succesfully" });
      updateNote(note.id, updatedNote);
    } catch (error) {
      toast({ title: "There was a problem updating your note" });
    }
  }

  async function handleCheckSubtask(id: number, state: CheckedState) {
    try {
      const noteCopy = { ...note };
      const taskskCopy = [...noteCopy.tasks];
      const updatedSubtasks = taskskCopy.map((task: Task) => {
        if (task.id === id) {
          return { ...task, checked: state };
        } else {
          return task;
        }
      });

      const updatedNote: Note = { ...noteCopy, tasks: [...updatedSubtasks] };

      const savedNote = await updateBdNote(updatedNote);

      updateNote(note.id, savedNote);
    } catch (error) {
      toast({ title: "There was a problem updating your note" });
    }
  }

  return (
    <NoteContainer>
      <NoteHeader title={note.title} deadline={note.date} />
      <NoteContent>
        <div className="flex flex-col gap-3">
          {note.tasks.map((task: Task) => {
            return (
              <TaskItem
                task={task}
                key={task.id}
                onCheck={handleCheckSubtask}
              />
            );
          })}
        </div>
        <div className="flex justify-end gap-3 mt-4">
          <ModalTrigger
            modal={<DeleteAlertDialog onClick={handleDeleteNote} />}
          >
            <Bomb className="hover:text-rose-600 cursor-pointer h-5" />
          </ModalTrigger>
          <ModalTrigger modal={<EditDialog note={note} />}>
            <SquarePen className="hover:text-orange-400 cursor-pointer h-5" />
          </ModalTrigger>
          <ModalTrigger
            modal={<ArchiveAlertDialog onClick={handleArchiveNote} />}
          >
            <Archive className="hover:text-gray-500 cursor-pointer h-5" />
          </ModalTrigger>
        </div>
      </NoteContent>
    </NoteContainer>
  );
}

/** SUB COMPONENTS */

function NoteContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="task w-full py-3 rounded-md mb-3 bg-[#e4faf1] hover:bg-[#d7f8eb] inline-block">
      {children}
    </div>
  );
}

function NoteHeader({ title, deadline }: { title: string; deadline: string }) {
  return (
    <div className="flex justify-between w-full px-4 h-full max-md:flex-col-reverse max-md:mb-1 max-sm:flex-row max-sm:mb-0 font-bold text-zinc-700">
      <h3 className="w-[5rem] text-left overflow-hidden">{title}</h3>
      <Separator
        orientation="vertical"
        className="mx-1 max-md:hidden max-sm:block"
      />
      <div>{moment(deadline).format("LL")}</div>
    </div>
  );
}

function NoteContent({ children }: { children: React.ReactNode }) {
  return <div className="w-full px-4 mt-1">{children}</div>;
}

function TaskItem({
  task,
  onCheck,
}: {
  task: Task;
  onCheck: (id: number, state: CheckedState) => void;
}) {
  const [checked, setChecked] = useState<CheckedState>(task.checked);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleChecked(check: CheckedState) {
    setChecked(check);
    setIsLoading(true);
    await onCheck(task.id, check);
    setIsLoading(false);
  }

  return (
    <div className="subtask">
      <div className="flex items-center space-x-2 cursor-pointer">
        <Checkbox
          className="disabled:cursor-pointer"
          id={`terms-${task.id}`}
          checked={checked}
          onCheckedChange={handleChecked}
          disabled={isLoading}
        />
        <label
          htmlFor={`terms-${task.id}`}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {task.content}
        </label>
      </div>
    </div>
  );
}
