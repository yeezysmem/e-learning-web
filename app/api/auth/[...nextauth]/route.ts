import NextAuth from "next-auth/next";
import Github from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";

import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import { DefaultSession } from "next-auth";
import {PrismaAdapter} from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client";
// import { createTransport } from "nodemailer"

declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
    } & DefaultSession["user"];
  }
}

const prisma = new PrismaClient();

const prismaAdapter = PrismaAdapter(prisma);


export const authOptions: AuthOptions = {
  // adapter: prismaAdapter(prisma)
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
  },
  providers: [
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     email: { label: "Email", type: "email", placeholder: "Email" },
    //     password: {
    //       label: "Password",
    //       type: "password",
    //       placeholder: "Password",
    //     },
    //   },
    //   async authorize(credentials) {
    //     const user = {
    //       id: 1,
    //       name: "J Smith",
    //       email: "eeeee@gmail.com",
    //       password: "nextauth",
    //     };
    //     if (
    //       user.email === credentials?.email &&
    //       user.password === credentials.password
    //     ) {
    //       return user;
    //     } else {
    //       return null;
    //     }
    //   },
    // }),
    // EmailProvider({
    //   id: "email",
    //   name: "Email",
    //   server: {
    //     host: process.env.EMAIL_SERVER_HOST,
    //     port: process.env.EMAIL_SERVER_PORT,
    //     auth: {
    //       user: process.env.EMAIL_SERVER_USER,
    //       pass: process.env.EMAIL_SERVER_PASSWORD,
    //     },
    //     from: process.env.EMAIL_FROM,
    //   }
    // }),

    
    Github({
      clientId: process.env.GITHIB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  //   GoogleProvider({
  //     clientId: process.env.GOOGLE_ID ?? "",
  //     clientSecret: process.env.GOOGLE_SECRET ?? "",
  //     authorization: {
  //       params: {
  //         prompt: "consent",
  //         access_type: "offline",
  //         response_type: "code",
  //       },
  //     },
  //   }),
  ],
  // pages: {
  //   signIn: "/auth/signin",
  //   signOut: "/auth/signout",
  //   error: "/auth/error",
  //   verifyRequest: "/auth/verify-request",
  //   // newUser: null,
  // },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
