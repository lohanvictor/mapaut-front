import { LineChart } from "@mui/x-charts";
import { Container } from "./styled";

const labels = ["Interação", "Comunicação", "Comportamento", "Cognição"];

type Props = {
  data: [number, number, number, number];
};

export function GraphVGA(props: Props) {
  const labelsMapped = labels.map(
    (label, index) => label + ": " + Math.trunc(props.data[index]) + "%"
  );

  return (
    <Container>
      <LineChart
        width={500}
        height={200}
        series={[
          {
            data: props.data,
            label: "Visão Geral do Autista (nível de comprometimento)",
            curve: "linear",
            showMark: false,
            valueFormatter: (value) => `${Math.trunc(value!)}%`,
          },
        ]}
        title="Visão Geral do Autista"
        xAxis={[
          {
            data: labelsMapped,
            scaleType: "point",
          },
        ]}
      />

      {/* <div className="absolute top-0 left-0 w-full h-full bg-slate-400 rounded-md container-hover"></div> */}
    </Container>
  );
}
