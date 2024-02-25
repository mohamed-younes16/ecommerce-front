import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prismadb from "@/lib/prismabd";
import bcrypt from "bcryptjs";

export const authOpts: AuthOptions = {
  adapter: PrismaAdapter(prismadb),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "text" },
      },
      async authorize(cred) {

        if (!cred?.email || !cred?.password) {
          throw new Error("no Creds____________________");
        }

        const user = await prismadb.user.findUnique({
          where: { email: cred.email },
        });

        if (!user || !user.hashedpassword) {
          throw new Error("wrong email");
        }
        const iscorrect = await bcrypt.compare(
          cred.password,
          user.hashedpassword
        );

        await bcrypt.compare(cred.password, user.hashedpassword);
        if (!iscorrect) {
          throw new Error("Wrong password");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/",
    signOut: "/",
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};
export const handler = NextAuth(authOpts);
export { handler as GET, handler as POST };
