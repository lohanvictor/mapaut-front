import { useSession } from "@/app/_contexts/sessionContext";
import OptionModal from "../../OptionModal";
import { useRouter } from "next/navigation";

type Props = {
  onClose: () => void;
};

export function LogoutModal(props: Props) {
  const { handleLogout } = useSession();
  const route = useRouter();

  async function handleClick() {
    await handleLogout();
    route.replace("/");
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
