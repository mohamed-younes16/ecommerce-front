import bcrypt from "bcryptjs";
import prismadb from "@/lib/prismabd";

import { NextResponse, } from "next/server";

export async function POST(req: Request) {
  try {

    const {
      email,
      name,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    } = await req.json();

    if (!name || !email || !password)
      return new NextResponse("no Name Provided", { status: 401 });

    try {
      const hashedpassword = await bcrypt.hash(password, 12);

      const userupsert = await prismadb.user.create({
        data: { email, hashedpassword ,name},
      });
      return NextResponse.json(
        { message: "User created is ready", userupsert },
        { status: 200 }
      );
    } catch (error) {
      console.log(error, "##########user create ###############");
      return NextResponse.json({ message: "error in server" }, { status: 500 });
    }
  } catch (error) {
    console.log(error, "##########user create###############");
    return NextResponse.json({ message: "error in server" }, { status: 500 });
  }
}
