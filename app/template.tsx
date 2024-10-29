import { Toaster } from "react-hot-toast";
import { Navbar } from "./_components/Navbar";
import { GuardProvider } from "./_contexts/guardContext";
import { SessionProvider } from "./_contexts/sessionContext";

type RootTemplateProps = {
  children: React.ReactNode;
};

export default function RootTemplate(props: RootTemplateProps) {
  return (
    <SessionProvider>
      <GuardProvider>
        <div className="flex flex-row w-full h-full bg-gray-50">
          <Navbar />
          <div className="flex-1 flex overflow-y-auto">{props.children}</div>
        </div>
        <Toaster />
      </GuardProvider>
    </SessionProvider>
  );
}
