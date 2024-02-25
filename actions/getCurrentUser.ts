import { getServerSession } from "next-auth";
import { authOpts } from "@/app/api/auth/[...nextauth]/route";
import prismadb from "@/lib/prismabd";

export const getSession = async () => await getServerSession(authOpts);

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const user = await prismadb.user.findFirst({
      where: {
        email: session.user.email,
      },
      select: {
        email: true,
        name: true,
        username: true,
        imageUrl: true,
        onboarded: true,
        bio: true,
        id: true,
        createdAt: true,
      },
    });

    return user;
  } catch (error: any) {
    return null;
  }
}
