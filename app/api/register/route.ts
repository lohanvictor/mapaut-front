import { RegisterModel, RegisterResponse } from "@/app/@types/login.type";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { createHash } from "crypto";
import { firebaseAdmin } from "../_lib/firebase";

const auth = getAuth(firebaseAdmin);

export async function GET(request: NextRequest) {
  const uid = request.nextUrl.searchParams.get("uid");

  try {
    if (!uid) throw new Error("uid is required");

    const user = await auth.getUser(uid);
    const response: RegisterResponse = {
      email: user.email || "",
      name: user.displayName || "",
    };
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { status: "Erro ao recuperar informação do usuário" },
      { status: HttpStatusCode.UnprocessableEntity }
    );
  }
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as RegisterModel;

  if (body.email === "") {
    return NextResponse.json(
      { error: "Email is required" },
      { status: HttpStatusCode.UnprocessableEntity }
    );
  }

  if (body.password === "") {
    return NextResponse.json(
      { error: "Password is required" },
      { status: HttpStatusCode.UnprocessableEntity }
    );
  }

  const hashedPassword = createHash("sha256")
    .update(body.password)
    .digest("hex");

  try {
    await auth.createUser({
      displayName: body.name,
      email: body.email,
      emailVerified: true,
      password: hashedPassword,
    });
    return NextResponse.json({ ok: true }, { status: HttpStatusCode.Created });
  } catch (error) {
    return NextResponse.json({ status: HttpStatusCode.UnprocessableEntity });
  }
}
