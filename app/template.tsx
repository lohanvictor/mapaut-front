import { Navbar } from "./_components/Navbar";
import { SessionProvider } from "./_contexts/sessionContext";

type RootTemplateProps = {
  children: React.ReactNode;
};

export default function RootTemplate(props: RootTemplateProps) {
  return (
    <SessionProvider>
      <div className="flex flex-row w-full h-full bg-gray-50">
        <Navbar />
        <div className="flex-1 flex overflow-y-auto">{props.children}</div>
      </div>
    </SessionProvider>
  );
}
