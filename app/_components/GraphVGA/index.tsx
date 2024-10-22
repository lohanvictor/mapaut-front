import { LineChart, lineElementClasses } from "@mui/x-charts";

const labels = ["Interação", "Comunicação", "Comportamento", "Cognição"];

type Props = {
  data: [number, number, number, number];
};

export function GraphVGA(props: Props) {
  return (
    <div className="w-auto relative">
      <LineChart
        width={500}
        height={200}
        series={[
          {
            data: props.data,
            label: "Visão Geral do Autista",
            curve: "linear",
          },
        ]}
        title="Visão Geral do Autista"
        xAxis={[{ data: labels, scaleType: "point" }]}
      />

      <div className="absolute top-0 left-0 w-full h-full bg-slate-400 rounded-md"></div>
    </div>
  );
}