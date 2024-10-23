import { useRouter } from "next/navigation";

export function LoginButton() {
  const route = useRouter();

  function handleClick() {
    route.push("/login");
  }

  return (
    <>
      <button
        onClick={handleClick}
        className="text-slate-950 hover:bg-slate-400 hover:text-white p-2 rounded-md w-full"
      >
        <span>Fazer Login</span>
      </button>
    </>
  );
}
