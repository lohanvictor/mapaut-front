import { Skeleton } from "@mui/material";

export default function PersonasViewLoading() {
  return (
    <div className="flex-1 flex flex-col items-center gap-4 p-6">
      <div className="w-full flex flex-row justify-between">
        <div className="flex gap-4">
          <Skeleton variant="circular" width={128} height={128} />
        </div>
      </div>
    </div>
  );
}
