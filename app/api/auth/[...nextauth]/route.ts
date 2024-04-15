import NextAuth from "next-auth/next";
import Github from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email"

import type { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import { DefaultSession } from "next-auth";
// import { createTransport } from "nodemailer"

declare module 'next-auth' {
  interface Session {
    user?: {
      id: string;
    } & DefaultSession['user'];
  }
}

export const authOptions: AuthOptions = {
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
        Github({
            clientId: process.env.GITHIB_ID ?? "",
            clientSecret: process.env.GITHUB_SECRET ?? "",
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID ?? "",
            clientSecret: process.env.GOOGLE_SECRET ?? "",
            authorization: {
              params: {
                prompt: "consent",
                access_type: "offline",
                response_type: "code"
              }
            }
        }),
    ],
};



export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }