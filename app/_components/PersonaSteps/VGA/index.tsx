import { InteracaoStep } from "./steps/Interacao";

export function VGA() {

  return (
    <div className="max-h-full w-full overflow-y-auto flex flex-col gap-4">
      <InteracaoStep onNextStep={() => null} />
    </div>
  );
}
