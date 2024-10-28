import { PERSONA_MOCK } from "@/app/_mocks/persona.mock";
import { NextRequest, NextResponse } from "next/server";
import { PersonaService } from "../_persona.service";
import { PersonaModel } from "@/app/@types/persona.type";

type GetOptions = {
  params: {
    id: string;
  };
};

export async function GET(request: NextRequest, options: GetOptions) {
  try {
    const response = await PersonaService.getById(options.params.id);

    if (!response)
      return NextResponse.json(
        { message: "Persona não existe" },
        { status: 404 }
      );

    return NextResponse.json(response);
  } catch (error) {
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
  try {
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao atualizar persona" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, options: GetOptions) {
  try {
    await PersonaService.delete(options.params.id);
    return NextResponse.json({ message: "Persona deletada com sucesso" });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao deletar persona" },
      { status: 500 }
    );
  }
}
