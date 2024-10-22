import { useSession } from "@/app/_contexts/sessionContext";
import OptionModal from "../../OptionModal";

type Props = {
  onClose: () => void;
};

export function LogoutModal(props: Props) {
  const { handleLogout } = useSession();

  function handleClick() {
    handleLogout();
    props.onClose();
  }

  return (
    <OptionModal
      text="Você deseja sair do sistema?"
      isOpen
      onCancel={props.onClose}
      onProceed={handleClick}
      type="danger"
    />
  );
}
