"use client";

import { ArrowBack } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  function handleBack() {
    router.push("/personas");
  }
  return (
    <IconButton onClick={handleBack} size="medium">
      <ArrowBack />
    </IconButton>
  );
}
