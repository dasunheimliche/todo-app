import { useState } from "react";
import useTodoStore from "../stores/useTodoStore";

import { Input } from "./ui/input";
import { Button } from "./ui/button";

import Modal from "./ui/modal";
import ModalClose from "./ui/modal-close";
import FormLabel from "./ui/form-label";
import FormTask from "./form-task";
import InputGroup from "./ui/input-group";
import ModalAccept from "./ui/modal-accept";
import { Tag, Task } from "@/types";

import { addNoteToBD, fetchTags } from "@/lib/services";

import { WithContext as ReactTags } from "react-tag-input";
import { useToast } from "./ui/use-toast";

const fechaActual = new Date();

const año = fechaActual.getFullYear();
const mes = ("0" + (fechaActual.getMonth() + 1)).slice(-2); // Suma 1 al mes, ya que los meses se indexan desde 0
const dia = ("0" + fechaActual.getDate()).slice(-2);

const fechaFormateada = año + "-" + mes + "-" + dia;

const KeyCodes = {
  comma: 188,
  enter: 13,
};
const delimiters = [KeyCodes.comma, KeyCodes.enter];

export default function FormNewNote() {
  const { addNote, tags, addTags, setSelectedTag } = useTodoStore();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [tasks, setTasks] = useState<any>([]);
  const [taskContent, setTaskContent] = useState<string>("");
  const [formTags, setFormTags] = useState<Tag[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  function handleAddTask() {
    if (taskContent.trim().length < 3) return;

    const task = {
      id: tasks.length === 0 ? 0 : tasks[tasks.length - 1].id + 1,
      content: taskContent,
    };

    tasks.push(task);
    setTaskContent("");
  }

  function handleChangeSubtask(e: React.ChangeEvent<HTMLInputElement>) {
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

      const newNote = {
        title,
        description,
        date: fechaFormateada,
        tasks,
        tags: fetchedTags.allTags,
        archived: false,
      };

      const savedNote = await addNoteToBD(newNote);

      addTags(fetchedTags.newTags);
      addNote(savedNote);
    } catch (error) {
      toast({ title: "Something went wrong, your not was not added" });
      console.error(error);
    } finally {
      setSelectedTag({ id: "all", text: "all" });
      setIsLoading(false);
      resetForm();
    }
  }

  function handleCancel() {
    resetForm();
  }

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setTasks([]);
    setTaskContent("");
    setFormTags([]);
  };

  function removeSubtask(id: number) {
    const updatedList = tasks.filter((task: Task) => task.id !== id);
    setTasks(updatedList);
  }

  const isDisabled = !title || isLoading;

  const handleDelete = (i: any) => {
    if (!formTags) return;
    setFormTags(formTags.filter((_tag: any, index: number) => index !== i));
  };

  const handleAddition = (tag: Tag) => {
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
        <h3 className="font-semibold text-lg text-slate-900">Crear tarea</h3>
        <InputGroup>
          <FormLabel htmlFor="title">TITULO</FormLabel>
          <Input
            id="title"
            className="h-10 border-0 border-b-[1px] border-slate-300 rounded-none focus-visible:ring-0 shadow-none"
            placeholder="Title"
            type="text"
            onChange={handleChangeTitle}
            value={title}
            required
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
                <FormTask key={i} subtask={t} onRemoveSubtask={removeSubtask} />
              );
            })}
          </div>
        </InputGroup>
        <InputGroup>
          <FormLabel htmlFor="subtask">AGREGAR TAREA</FormLabel>
          <div className="flex">
            <Input
              id="subtask"
              type="text"
              placeholder="Tarea"
              onChange={handleChangeSubtask}
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
          <ModalClose onClick={handleCancel} />
          <ModalAccept
            onClick={handleSubmit}
            label="Agregar"
            disabled={isDisabled}
          />
        </div>
      </form>
    </Modal>
  );
}
