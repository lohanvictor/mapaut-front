import OptionModal from "@/app/_components/_modal/OptionModal";
import Button from "@mui/material/Button";
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

      <OptionModal
        isOpen={isOpenModal}
        onCancel={toggleModal}
        onProceed={props.onCancel}
        text="Você realmente deseja cancelar a criação desta persona?"
        type="danger"
      />
    </>
  );
}
