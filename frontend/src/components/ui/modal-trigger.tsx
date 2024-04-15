import { AlertDialog, AlertDialogTrigger } from "./alert-dialog";

export default function ModalTrigger({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger>{children}</AlertDialogTrigger>
      {modal}
    </AlertDialog>
  );
}
