import { RegisterModel } from "@/app/@types/login.type";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  getAdditionalUserInfo,
} from "firebase/auth";
import firebase from "../_lib/firebase";
import { createHash } from "crypto";
import { ACCESS_TOKEN_STORAGE_KEY } from "@/app/_constants/keys.constants";

export async function GET(request: NextRequest) {
  const cookieFromRequest = request.nextUrl.searchParams.get("token");

  const auth = getAuth(firebase);
  return NextResponse.json({ ok: true });
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
  console.log(hashedPassword);

  const auth = getAuth(firebase);
  try {
    await createUserWithEmailAndPassword(auth, body.email, hashedPassword);
    await updateProfile(auth.currentUser!, { displayName: body.name });
    return NextResponse.json({ ok: true }, { status: HttpStatusCode.Created });
  } catch (error) {
    return NextResponse.json({ status: HttpStatusCode.UnprocessableEntity });
  }
}
