import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  theme: {
    colorScheme: "light",
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, isNewUser }) {
      if (user?.type) {
        token.status = user.type;
      }

      if (user?.role) {
        token.role = user.role;
      }

      if (isNewUser) {
        token.role = "USER";
      }
      return token;
    },
    async session({ session, token }) {
      session.type = token.type;
      session.role = token.role;

      return session;
    },
  },
});
