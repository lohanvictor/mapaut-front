import { LIST_PERSONAS_MOCK } from "@/app/_mocks/persona.mock";
import { NextRequest, NextResponse } from "next/server";

type GetOptions = {
  params: {};
};

const PAGES_PER_PAGE = 10;

export async function GET(request: NextRequest, options: GetOptions) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page");
  if (page) {
    return NextResponse.json({
      ...LIST_PERSONAS_MOCK,
      pagination: { page: +page, pages: PAGES_PER_PAGE },
    } as typeof LIST_PERSONAS_MOCK);
  }
  return NextResponse.json(LIST_PERSONAS_MOCK);
}
