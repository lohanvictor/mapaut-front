import { Skeleton } from "@mui/material";

export default function LoginLoading() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <Skeleton
        variant="rectangular"
        width={378}
        height={384}
        className="rounded-md"
      />
    </div>
  );
}
