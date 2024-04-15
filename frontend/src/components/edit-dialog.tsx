import { Note, Tag, Task } from "@/types";
import FormTask from "./form-task";
import useTodoStore from "../stores/useTodoStore";
import { Button } from "./ui/button";
import { WithContext as ReactTags } from "react-tag-input";

import { Input } from "./ui/input";
import { useState } from "react";

import Modal from "./ui/modal";
import FormLabel from "./ui/form-label";
import ModalClose from "./ui/modal-close";
import InputGroup from "./ui/input-group";
import ModalAccept from "./ui/modal-accept";
import { fetchTags, updateBdNote } from "@/lib/services";
import { useToast } from "./ui/use-toast";

const KeyCodes = {
  comma: 188,
  enter: 13,
};
const delimiters = [KeyCodes.comma, KeyCodes.enter];

export default function EditDialog({ note }: { note: Note }) {
  const { updateNote, tags, addTags, setSelectedTag } = useTodoStore();

  const [title, setTitle] = useState<string>(note.title);
  const [description, setDescription] = useState<string>(note.description);
  const [tasks, setTasks] = useState<Task[]>(note.tasks);
  const [taskContent, setTaskContent] = useState<string>("");
  const [formTags, setFormTags] = useState<Tag[] | null>(
    note.tags.filter((t) => t.text !== "all")
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  function handleAddTask() {
    const task: Task = {
      id: tasks.length === 0 ? 0 : tasks.length + 1,
      content: taskContent,
      checked: false,
    };

    tasks.push(task);
    setTaskContent("");
  }

  function handleChangeTask(e: React.ChangeEvent<HTMLInputElement>) {
    setTaskContent(e.target.value);
  }

  function handleChangeTitle(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }

  function handleChangeDescription(e: React.ChangeEvent<HTMLInputElement>) {
    setDescription(e.target.value);
  }

  async function handleSubmit() {
    if (!title) return;
    setIsLoading(true);
    try {
      const fetchedTags = await fetchTags(formTags);

      const newNote: Note = {
        id: note.id,
        title,
        description,
        date: note.date,
        tags: fetchedTags.allTags,
        tasks,
        archived: note.archived,
      };

      const updatedNote = await updateBdNote(newNote);

      addTags(fetchedTags.newTags);
      updateNote(note.id, updatedNote);
    } catch (error) {
      toast({ title: "Something went wrong, your note was not updated" });
      console.error(error);
    } finally {
      setSelectedTag({ id: "all", text: "all" });
      setIsLoading(false);
    }
  }

  function handleRemoveSubtask(id: number) {
    const updatedList = tasks.filter((task: Task) => task.id !== id);
    setTasks(updatedList);
  }

  const handleDelete = (i: any) => {
    if (!formTags) return;
    setFormTags(formTags.filter((tag: any, index: any) => index !== i));
  };

  const handleAddition = (tag: any) => {
    if (!formTags) {
      setFormTags([tag]);
    } else {
      setFormTags([...formTags, tag]);
    }
  };

  const handleDrag = (tag: any, currPos: any, newPos: any) => {
    if (!formTags) return;
    const newTags = formTags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    setFormTags(newTags);
  };

  return (
    <Modal>
      <form className="flex flex-col gap-3">
        <h3 className="font-semibold text-lg text-slate-900">Editar tarea</h3>
        <InputGroup>
          <FormLabel htmlFor="title">TITULO</FormLabel>
          <Input
            id="title"
            className="h-10 border-0 border-b-[1px] border-slate-300 rounded-none focus-visible:ring-0 shadow-none"
            placeholder="Title"
            type="text"
            onChange={handleChangeTitle}
            value={title}
          />
        </InputGroup>
        <InputGroup>
          <FormLabel htmlFor="description">DESCRIPCION</FormLabel>
          <Input
            id="description"
            className="h-10 border-0 border-b-[1px] border-slate-300 rounded-none focus-visible:ring-0 shadow-none"
            placeholder="Description"
            type="text"
            onChange={handleChangeDescription}
            value={description}
            required
          />
        </InputGroup>
        <InputGroup>
          <FormLabel>TAREAS</FormLabel>
          <div className="w-full min-h-20 bg-slate-100 rounded-[0.25rem] outline-[3px] outline-slate-200 p-3 py-4">
            {tasks?.map((t: Task, i: number) => {
              return (
                <FormTask
                  key={i}
                  subtask={t}
                  onRemoveSubtask={handleRemoveSubtask}
                />
              );
            })}
          </div>
        </InputGroup>
        <InputGroup>
          <FormLabel htmlFor="task">AGREGAR TAREA</FormLabel>
          <div className="flex">
            <Input
              id="task"
              type="text"
              placeholder="Tarea"
              onChange={handleChangeTask}
              value={taskContent}
              className="h-10 border-0 border-b-[1px] border-slate-300 rounded-none focus-visible:ring-0 shadow-none"
              minLength={2}
            />
            <Button
              className="h-10 border border-[#bfffe8] bg-[#bfffe8] text-zinc-700 text-[1.4rem] rounded-none shadow-none hover:bg-[#181A1F] hover:text-zinc-50 relative translate-y-[1px]"
              type="button"
              onClick={handleAddTask}
            >
              +
            </Button>
          </div>
        </InputGroup>
        <InputGroup>
          <FormLabel htmlFor="subtask">AGREGAR TAGS</FormLabel>
          <ReactTags
            tags={formTags ? formTags : undefined}
            suggestions={tags}
            delimiters={delimiters}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            handleDrag={handleDrag}
            inputFieldPosition="bottom"
            autocomplete
            classNames={{
              tagInputField:
                "w-full h-10 border-0 border-b-[1px] border-slate-300 rounded-none focus-visible:ring-0 shadow-none focus-visible:outline-none",
              selected: "flex gap-2",
              tag: "bg-black px-2 py-1 rounded flex gap-1 text-white text-[0.75rem] items-center",
            }}
          />
        </InputGroup>
        <div className="flex justify-end mt-3 gap-2">
          <ModalClose />
          <ModalAccept
            onClick={handleSubmit}
            label="Confirmar"
            disabled={isLoading}
          />
        </div>
      </form>
    </Modal>
  );
}
