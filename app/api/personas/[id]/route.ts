import { PERSONA_MOCK } from "@/app/_mocks/persona.mock";
import { NextRequest, NextResponse } from "next/server";

type GetOptions = {
  params: {
    id: string;
  };
};

export async function GET(request: NextRequest, options: GetOptions) {
  return NextResponse.json(PERSONA_MOCK);
}
