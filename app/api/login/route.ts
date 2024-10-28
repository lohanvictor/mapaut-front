import { LoginModel, LoginResponse } from "@/app/@types/login.type";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseClient } from "../_lib/firebase";
import { FirebaseError } from "firebase-admin";
import { createHash } from "crypto";

function handleErrorMessage(error: FirebaseError) {
  let message = "Error ao realizar login";
  const code = error.code;
  if (code === "auth/invalid-credential") {
    message = "Credenciais inválidas";
  }
  return message;
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as LoginModel;

  if (body.email === "" || body.password === "") {
    return NextResponse.json(
      { error: "All credentials are required" },
      { status: HttpStatusCode.UnprocessableEntity }
    );
  }

  const hashedPassword = createHash("sha256")
    .update(body.password)
    .digest("hex");

  const auth = getAuth(firebaseClient);

  try {
    const { user } = await signInWithEmailAndPassword(
      auth,
      body.email,
      hashedPassword
    );
    const response: LoginResponse = {
      name: user.displayName || "",
      email: user.email || "",
      token: await user.getIdToken(),
      uid: user.uid,
    };
    return NextResponse.json(response, { status: HttpStatusCode.Accepted });
  } catch (error) {
    console.error(error);
    const message = handleErrorMessage(error as FirebaseError);
    return NextResponse.json(
      { error: message },
      { status: HttpStatusCode.UnprocessableEntity }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const auth = getAuth(firebaseClient);
  await auth.signOut();
  return NextResponse.json({ ok: true });
}
