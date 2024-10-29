import { firebaseStorage } from "@/app/api/_lib/firebase";
import { NextResponse } from "next/server";

export async function POST(req: NextResponse) {
  const { id } = await req.json();
  const form = await req.formData();
  const image = form.get("file");

  if (!image) {
    return NextResponse.json(
      { message: "Imagem não encontrada" },
      { status: 422 }
    );
  }

  return NextResponse.json({ message: "Email enviado com sucesso" });
}
