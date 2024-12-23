import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "./components/SessionProvider";
import { ToastProvider } from "@/components/providers/toast-provider";
import { ConfettiProvider } from "@/components/providers/confetti-provider";
const manrope = Manrope({ subsets: ["latin"] });
 

export const metadata: Metadata = {
  title: "SkillUP",
  icons: {
    icon: "/public/favicon.png",
    apple: "/public/apple-touch-icon.png"
  },

};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={manrope.className}>
        <SessionProvider session={session}>
          <ConfettiProvider />
          {/* <NavMenu /> */}
          <ToastProvider />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
