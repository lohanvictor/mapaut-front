import { Navbar } from "./components/Navbar";

type RootTemplateProps = {
  children: React.ReactNode;
};

export default function RootTemplate(props: RootTemplateProps) {
  return (
    <div className="flex flex-row w-full h-full bg-gray-50">
      <Navbar />
      <div className="flex-1 flex p-6">{props.children}</div>
    </div>
  );
}
