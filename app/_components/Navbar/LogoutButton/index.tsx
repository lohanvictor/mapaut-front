import { useState } from "react";
import { LoginModal } from "../../_modal/custom/LoginModal";
import { LogoutModal } from "../../_modal/custom/LogoutModal";

export function LogoutButton() {
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = () => setOpenModal((prev) => !prev);

  return (
    <>
      <button
        onClick={toggleModal}
        className="text-red-600 hover:text-white hover:bg-red-600 p-2 rounded-md w-full"
      >
        <span>Sair</span>
      </button>

      {openModal && <LogoutModal onClose={toggleModal} />}
    </>
  );
}
