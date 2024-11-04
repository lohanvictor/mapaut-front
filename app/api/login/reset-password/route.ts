import { getAuth } from "firebase-admin/auth";
import { NextRequest, NextResponse } from "next/server";
import { firebaseAdmin } from "../../_lib/firebase";

const actionCodeSettings = {
  url: "http://localhost:3000/login",
  // This must be true for email link sign-in.
  handleCodeInApp: true,
};

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  const auth = getAuth(firebaseAdmin);

  await auth.generatePasswordResetLink(email, actionCodeSettings);
  return NextResponse.json({ message: "Email enviado com sucesso" });
}
