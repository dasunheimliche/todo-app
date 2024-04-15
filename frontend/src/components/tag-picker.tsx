import { useEffect } from "react";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import useTodoStore from "@/stores/useTodoStore";
import { Tag } from "@/types";
import { useToast } from "./ui/use-toast";

export default function TagPicker() {
  const { tags, selectedTag, setSelectedTag, fetchTags } = useTodoStore();
  const { toast } = useToast();

  useEffect(() => {
    const fetchTagsAsync = async () => {
      try {
        await fetchTags();
      } catch (error) {
        toast({ title: "There was an error in getting your tags" });
      }
    };

    fetchTagsAsync();
  }, [fetchTags, toast]);

  return (
    <ul className="flex justify-end items-center gap-3 h-16 px-5">
      {tags.map((tag: Tag, i: number) => {
        return (
          <li key={i}>
            <TabButton
              isSelected={selectedTag === tag}
              label={tag.text}
              onClick={() => setSelectedTag(tag)}
            />
          </li>
        );
      })}
    </ul>
  );
}

interface TabButtonProps extends React.ComponentProps<typeof Button> {
  label: string;
  isSelected: boolean;
}

function TabButton({ label, isSelected, ...props }: TabButtonProps) {
  return (
    <Button
      className={cn(
        "font-semibold shadow-none rounded-[1.2rem] px-4 py-2 bg-[#d7f8eb] hover:bg-[#181A1F]  text-zinc-800 hover:text-zinc-50",
        isSelected && "bg-[#181A1F] text-slate-50"
      )}
      {...props}
    >
      {label}
    </Button>
  );
}
