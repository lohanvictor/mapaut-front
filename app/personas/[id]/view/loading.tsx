import ArrowBack from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Skeleton from "@mui/material/Skeleton";

export default function PersonasViewLoading() {
  return (
    <div className="w-full flex-1 flex flex-col items-center gap-4 p-6">
      <div className="w-full flex flex-row justify-between items-center">
        <IconButton size="medium">
          <ArrowBack />
        </IconButton>

        <div className="flex flex-row gap-4">
          <Button variant="contained" color="error">
            Excluir
          </Button>
          <Button variant="contained">Editar</Button>
        </div>
      </div>

      <div className="w-full flex flex-row justify-between">
        <div className="flex gap-4">
          <Skeleton
            animation="wave"
            variant="circular"
            width={175}
            height={175}
          />
          <div className="flex flex-col items-start">
            <Skeleton animation="wave" width={300} height={70} variant="text" />
            <Skeleton animation="wave" width={300} height={100} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 pb-6">
        <Skeleton
          animation="wave"
          variant="rectangular"
          width="100%"
          height={200}
        />
        <Skeleton
          animation="wave"
          variant="rectangular"
          width="100%"
          height={200}
        />
        <Skeleton
          animation="wave"
          variant="rectangular"
          width="100%"
          height={200}
        />
        <Skeleton
          animation="wave"
          variant="rectangular"
          width="100%"
          height={200}
        />
      </div>
    </div>
  );
}
