import { useState } from "react";
import { LoginModal } from "../../_modal/custom/LoginModal";

export function LoginButton() {
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = () => setOpenModal((prev) => !prev);

  return (
    <>
      <button
        onClick={toggleModal}
        className="text-slate-950 hover:bg-slate-400 hover:text-white p-2 rounded-md w-full"
      >
        <span>Fazer Login</span>
      </button>

      {openModal && <LoginModal onClose={toggleModal} />}
    </>
  );
}
