import {
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

import Modal from "./ui/modal";
import ModalAccept from "./ui/modal-accept";
import ModalClose from "./ui/modal-close";

export default function ArchiveAlertDialog({
  onClick,
}: {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) {
  return (
    <Modal>
      <AlertDialogHeader>
        <AlertDialogTitle>Estas seguro/a?</AlertDialogTitle>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <ModalClose />
        <ModalAccept onClick={onClick} label="Confirmar" />
      </AlertDialogFooter>
    </Modal>
  );
}
