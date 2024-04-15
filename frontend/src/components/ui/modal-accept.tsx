import { AlertDialogAction } from "./alert-dialog";

interface ModalAcceptProps
  extends React.ComponentProps<typeof AlertDialogAction> {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  label: string;
}

export default function ModalAccept({
  onClick,
  label,
  ...props
}: ModalAcceptProps) {
  return (
    <AlertDialogAction
      className="font-semibold shadow-none rounded-[1.2rem] px-6 py-5 bg-[#bfffe8] hover:bg-[#181A1F]  text-zinc-800 hover:text-zinc-50"
      onClick={onClick}
      {...props}
    >
      {label}
    </AlertDialogAction>
  );
}
