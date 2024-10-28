import { LIST_PERSONAS_MOCK } from "@/app/_mocks/persona.mock";
import { NextRequest, NextResponse } from "next/server";
import { PersonaService } from "./_persona.service";
import { PersonaModel } from "@/app/@types/persona.type";

export const PAGES_PER_PAGE = 10;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page");
  const name = searchParams.get("name");
  if (page) {
    const response = await PersonaService.getAllBy(+page, name || "");
    return NextResponse.json(response);
  }
  return NextResponse.json(LIST_PERSONAS_MOCK);
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as PersonaModel;
  body.foto =
    "https://pm1.aminoapps.com/8018/ec9b52841ae5d91f60d28740147aa755418370a6r1-640-556v2_uhq.jpg";

  try {
    const response = await PersonaService.save(body);
    return NextResponse.json({
      message: "Persona criada com sucesso",
      id: response.id,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao criar persona" },
      { status: 500 }
    );
  }
}
