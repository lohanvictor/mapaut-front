import Modal from "@/app/_components/Modal/Modal";
import { Button } from "@mui/material";
import { useState } from "react";

type CancelButtonProps = {
  onCancel: () => void;
};

export default function CancelButton(props: CancelButtonProps) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  function toggleModal() {
    setIsOpenModal((prev) => !prev);
  }

  return (
    <>
      <Button onClick={toggleModal} variant="contained" color="error">
        Cancelar
      </Button>

      <Modal
        isOpen={isOpenModal}
        onCancel={toggleModal}
        onProceed={props.onCancel}
        text="Você realmente deseja cancelar a criação desta persona?"
        type="danger"
      />
    </>
  );
}
