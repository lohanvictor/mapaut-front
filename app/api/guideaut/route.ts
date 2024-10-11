import { NextRequest, NextResponse } from "next/server";
import { GuideAutUtils } from "./utils";
import { GuideAutSection } from "@/app/@types/guideaut.type";
import {
  CALM_ACTIVITIES_MOCK,
  SOCIAL_ASPECTS_MOCK,
  SOFTWARE_ASPECTS_MOCK,
  STEREOTYPES_MOCK,
  STRESS_ACTIVITIES_MOCK,
} from "@/app/_constants/steps.constant";

const mockFn = () =>
  new Promise<string>((resolve) => setTimeout(() => resolve(""), 1000));

const mapGuideAut: Record<GuideAutSection, string[]> = {
  aspectos_sociais: SOCIAL_ASPECTS_MOCK,
  aspectos_software: SOFTWARE_ASPECTS_MOCK,
  atividades_acalmam: CALM_ACTIVITIES_MOCK,
  atividades_estressam: STRESS_ACTIVITIES_MOCK,
  manias: STEREOTYPES_MOCK,
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const section = searchParams.get("section") ?? "";
  const url = GuideAutUtils.getPath(section);

  console.log(url);
  await mockFn();

  if (Object.values(mapGuideAut).includes([section])) {
    return NextResponse.json(mapGuideAut[section as GuideAutSection]);
  }

  return NextResponse.error();
}
