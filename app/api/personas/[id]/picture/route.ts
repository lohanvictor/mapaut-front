import { firebaseStorage } from "@/app/api/_lib/firebase";
import { NextResponse } from "next/server";
import { PersonaService } from "../../_persona.service";
import { getDownloadURL } from "firebase-admin/storage";

type Options = {
  params: {
    id: string;
  };
};

export async function POST(req: NextResponse, options: Options) {
  const { id } = options.params;
  const form = await req.formData();
  let image = form.get("file");

  if (!image) {
    return NextResponse.json({ message: "image-error" }, { status: 400 });
  }

  image = image as File;

  const arrayBuffer = await image.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const path = `personas/${id}`;
  const file = firebaseStorage.file(path);

  await file.save(buffer);

  const publicUrl = await getDownloadURL(file);

  if (!publicUrl) {
    return NextResponse.json(
      { message: "Erro ao enviar imagem" },
      { status: 500 }
    );
  }

  await PersonaService.update({ id, foto: publicUrl });

  return NextResponse.json({ message: "Imagem enviado com sucesso", path });
}
