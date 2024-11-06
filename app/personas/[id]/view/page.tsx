"use client";
import { useEffect, useState } from "react";
import html2canvas from "html2canvas";

import { PersonaModel } from "@/app/_types/persona.type";
import ViewDetailsPersona from "@/app/_components/_detailsPersona/ViewDetailsPersona";
import BackButton from "./_components/BackButton";
import DeleteButton from "./_components/DeleteButton";
import EditButton from "./_components/EditButton";
import Button from "@mui/material/Button";
import LoadingModal from "@/app/_components/_modal/LoadingModal";
import jsPDF from "jspdf";
import { useSession } from "@/app/_contexts/sessionContext";

type PersonaViewProps = {
  params: {
    id: string;
  };
};

export default function PersonaView(props: PersonaViewProps) {
  const { login } = useSession();
  const [persona, setPersona] = useState<PersonaModel | null>(null);
  const [toPdf, setToPdf] = useState(false);

  async function urlToFile(url: string, filename: string) {
    const response = await fetch(url);
    const blob = await response.blob();

    return new File([blob], filename, { type: "image/jpeg" });
  }

  async function fetchPersona() {
    const response = (await (
      await fetch(`/api/personas/${props.params.id}`)
    ).json()) as PersonaModel;
    const imageFile = await urlToFile(response.foto, `${response.id}.jpeg`);
    const imageUrl = URL.createObjectURL(imageFile);
    response.foto = imageUrl;
    setPersona(response);
  }

  useEffect(() => {
    fetchPersona();
  }, []);

  async function handlePrint() {
    if (persona === null) return;

    setToPdf(true);
    const element = document.getElementById(persona.id);
    if (element) {
      const canvas = await html2canvas(element, {
        allowTaint: true,
        useCORS: true,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        unit: "px",
        orientation: "landscape",
        format: [canvas.width, canvas.height],
      });
      const filename = `${persona.nome}.pdf`;
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save(filename);
    }
    setToPdf(false);
  }

  if (persona === null) return null;

  return (
    <div className="flex-1 flex flex-col gap-8 p-6">
      <div className="flex flex-row justify-between items-center">
        <BackButton />

        <div className="flex flex-row gap-4">
          {login.uid === persona.usuarioId ? (
            <>
              <DeleteButton persona={persona} />
              <EditButton persona={persona} />
            </>
          ) : null}
          <Button onClick={handlePrint} variant="contained" color="inherit">
            Baixar
          </Button>
        </div>
      </div>

      <ViewDetailsPersona persona={persona} toPdf={toPdf} />

      {toPdf && <LoadingModal text="Baixando persona..." />}
    </div>
  );
}
