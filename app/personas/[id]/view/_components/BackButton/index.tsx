"use client";

import ArrowBack from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  function handleBack() {
    router.replace("/personas");
  }
  return (
    <IconButton onClick={handleBack} size="medium">
      <ArrowBack />
    </IconButton>
  );
}
