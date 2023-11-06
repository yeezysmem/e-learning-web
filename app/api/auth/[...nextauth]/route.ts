import NextAuth from "next-auth/next";
import Github from "next-auth/providers/github";

export const authOptions = {
    providers: [
        Github({
            clientId: process.env.GITHIB_ID ?? "",
            clientSecret: process.env.GITHUB_SECRET ?? "",
        }),
    ],
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }