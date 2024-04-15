import { Dot, X } from "lucide-react";
import { Separator } from "./ui/separator";
import { Task } from "@/types";

export default function FormSubtask({
  subtask,
  onRemoveSubtask,
}: {
  subtask: Task;
  onRemoveSubtask: (id: number) => void;
}) {
  return (
    <>
      <div className="flex items-center space-x-2 w-full relative">
        <div className="w-full flex items-center gap-1">
          <Dot />
          <label
            htmlFor="terms"
            className="cursor-pointer w-full text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {subtask.content}{" "}
          </label>
        </div>
        <X
          className="w-5 text-slate-500 cursor-pointer hover:text-slate-800 delete-icon"
          onClick={() => onRemoveSubtask(subtask.id)}
        />
      </div>
      <Separator className="my-2" />
    </>
  );
}
