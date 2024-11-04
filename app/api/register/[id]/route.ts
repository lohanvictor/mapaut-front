import { RegisterModel } from "@/app/_types/login.type";
import { HttpStatusCode } from "axios";
import { getAuth } from "firebase-admin/auth";
import { NextRequest, NextResponse } from "next/server";
import { firebaseAdmin, firebaseDb } from "../../_lib/firebase";
import { createHash } from "crypto";

type Options = {
  params: {
    id: string;
  };
};

const auth = getAuth(firebaseAdmin);

export async function PUT(req: NextRequest, options: Options) {
  const body = (await req.json()) as RegisterModel;
  const patchRegister: Record<string, string> = {
    displayName: body.name,
    email: body.email,
  };
  if (body.password) {
    const hashedPassword = createHash("sha256")
      .update(body.password)
      .digest("hex");
    patchRegister.password = hashedPassword;
  }

  try {
    await auth.updateUser(options.params.id, patchRegister);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ status: HttpStatusCode.UnprocessableEntity });
  }
}

export async function DELETE(req: NextRequest, options: Options) {
  try {
    await auth.deleteUser(options.params.id);
    const personasFromUser = await firebaseDb
      .collection("personas")
      .where("usuarioId", "==", options.params.id)
      .get();
    for (const doc of personasFromUser.docs) {
      await doc.ref.delete();
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ status: HttpStatusCode.UnprocessableEntity });
  }
}
