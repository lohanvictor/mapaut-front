import { NextRequest, NextResponse } from "next/server";
import { PersonaService } from "./_persona.service";
import { PersonaModel, PersonaModelList } from "@/app/_types/persona.type";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page");
  const name = searchParams.get("name");
  if (page) {
    const response = await PersonaService.getAllBy(+page, name || "");
    return NextResponse.json(response);
  }
  return NextResponse.json({
    items: [],
    pagination: { page: 1, pages: 1 },
    totalItems: 0,
  } as PersonaModelList);
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as PersonaModel;
  try {
    const response = await PersonaService.save(body);
    return NextResponse.json({
      message: "Persona criada com sucesso",
      id: response.id,
    });
  } catch {
    return NextResponse.json(
      { message: "Erro ao criar persona" },
      { status: 500 }
    );
  }
}
