import { ActivityContainer } from "./styled";

type LayoutActivityProps = {
  label: string;
  activities: string[];
};

export default function LayoutActivity(props: LayoutActivityProps) {
  return (
    <div className="w-full flex flex-col">
      <span className="text-slate-950 text-md">{props.label}</span>
      <ActivityContainer className="flex flex-col h-48 border-2 p-2 border-slate-950 rounded-md overflow-auto">
        {props.activities.map((activity, index) => (
          <span className="text-slate-950" key={index}>
            {activity}
          </span>
        ))}
      </ActivityContainer>
    </div>
  );
}
