import NextAuth, { NextAuthOptions } from "next-auth";
import Github from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";
import type { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { DefaultSession } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
// import { createTransport } from "nodemailer"

 

const prisma = new PrismaClient();

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Github({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }), // Add Google provider
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // First time jwt callback is run, user object will be available
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      if (trigger === "update") {
        return { ...token, ...session };
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Після логіну перенаправляємо користувача на головну сторінку
      return baseUrl;
    },
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify-request", // (used for check email message)
    newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
};


const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };