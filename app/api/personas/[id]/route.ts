import { NextRequest, NextResponse } from "next/server";
import { PersonaService } from "../_persona.service";
import { PersonaModel } from "@/app/_types/persona.type";
import { firebaseStorage } from "../../_lib/firebase";

type GetOptions = {
  params: {
    id: string;
  };
};

export async function GET(_: NextRequest, options: GetOptions) {
  try {
    const response = await PersonaService.getById(options.params.id);

    if (!response)
      return NextResponse.json(
        { message: "Persona não existe" },
        { status: 404 }
      );

    return NextResponse.json(response);
  } catch {
    return NextResponse.json(
      { message: "Erro ao buscar persona" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  const body = (await req.json()) as PersonaModel;

  await PersonaService.update(body);
  return NextResponse.json({ message: "Persona atualizada com sucesso" });
}

export async function DELETE(req: NextRequest, options: GetOptions) {
  try {
    await PersonaService.delete(options.params.id);

    try {
      await firebaseStorage.file(`personas/${options.params.id}`).delete();
    } catch {}

    return NextResponse.json({ message: "Persona deletada com sucesso" });
  } catch {
    return NextResponse.json(
      { message: "Erro ao deletar persona" },
      { status: 500 }
    );
  }
}
