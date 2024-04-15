import { cn } from "../../lib/utils";
import { AlertDialogContent } from "./alert-dialog";

interface ModalProps extends React.ComponentProps<typeof AlertDialogContent> {
  children: React.ReactNode;
}

export default function Modal({ children, className, ...props }: ModalProps) {
  return (
    <AlertDialogContent
      className={cn("w-96 max-sm:w-80 rounded-lg", className)}
      {...props}
    >
      {children}
    </AlertDialogContent>
  );
}
