import { ArrowBack } from "@mui/icons-material";
import { Button, IconButton, Skeleton } from "@mui/material";

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
        <div>
          <Skeleton animation="wave" variant="rectangular" />
        </div>
        <div>
          <Skeleton animation="wave" variant="rectangular" />
        </div>
        <div>
          <Skeleton animation="wave" variant="rectangular" />
        </div>
        <div>
          <Skeleton animation="wave" variant="rectangular" />
        </div>
      </div>
    </div>
  );
}
