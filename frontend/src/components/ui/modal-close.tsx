import { AlertDialogCancel } from "./alert-dialog";

interface ModalCloseProps
  extends React.ComponentProps<typeof AlertDialogCancel> {
  onClick?: () => void;
}

export default function ModalClose({ onClick, ...props }: ModalCloseProps) {
  return (
    <AlertDialogCancel
      onClick={onClick}
      className="font-semibold shadow-none rounded-[1.2rem] px-6 py-5 border border-[#F0FBF7]  hover:bg-[#181A1F]  text-zinc-800 hover:text-zinc-50 border-none"
      {...props}
    >
      Cancelar
    </AlertDialogCancel>
  );
}
