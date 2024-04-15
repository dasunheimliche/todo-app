import { cn } from "../lib/utils";
import useTodoStore from "../stores/useTodoStore";

export default function ModeSelector() {
  const { archivedMode, setArchivedMode } = useTodoStore();

  return (
    <ul className="flex justify-around items-center gap-6 h-12 px-5 font-semibold max-sm:text-[0.8rem]">
      <StateButton
        isSelected={!archivedMode}
        label={"Active"}
        onClick={() => setArchivedMode(false)}
      />
      <StateButton
        isSelected={archivedMode}
        label={"Archived"}
        onClick={() => setArchivedMode(true)}
      />
    </ul>
  );
}

function StateButton({
  isSelected,
  label,
  onClick,
}: {
  isSelected: boolean;
  label: "Active" | "Archived";
  onClick: () => void;
}) {
  return (
    <button
      className={cn("flex flex-col justify-center  items-center")}
      onClick={onClick}
    >
      <li>{label}</li>
      <div
        className={cn(
          "h-[1px] w-4 bg-gray-400 hidden",
          isSelected && "h-[1px] w-4 bg-gray-400 block"
        )}
      ></div>
    </button>
  );
}
