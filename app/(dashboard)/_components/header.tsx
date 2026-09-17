"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

import logo from "@/public/logo.svg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { data: session } = useSession();
  const user = session?.user;

  // Отримання ініціалів для фоллбеку аватара
  const userInitials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto flex justify-between items-center px-6 h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-x-2">
          <Image src={logo} width={36} height={36} alt="Learnify Logo" priority />
          <span className="font-bold text-base text-gray-900 tracking-tight">
            Learnify
          </span>
        </Link>

        {/* Navigation */}
        <nav>
          <ul className="flex items-center gap-x-6 text-xs font-semibold text-gray-700">
            <li>
              <Link
                href="/"
                className="hover:text-purple-600 transition-colors py-2"
              >
                Dashboard
              </Link>
            </li>

            <li>
              <Link
                href="/search"
                className="hover:text-purple-600 transition-colors py-2"
              >
                Search
              </Link>
            </li>

            {/* Auth section */}
            <li className="flex items-center pl-2 border-l border-gray-200">
              {session ? (
                <div className="flex items-center gap-x-3">
                  <Avatar className="h-8 w-8 border border-gray-200">
                    <AvatarImage src={user?.image || ""} alt={user?.name || "User"} />
                    <AvatarFallback className="bg-purple-100 text-purple-700 text-[10px] font-bold">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>

                  <button
                    onClick={() => signOut()}
                    title="Sign Out"
                    className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-rose-600 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <Button
                  onClick={() => signIn()}
                  size="sm"
                  className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition-colors shadow-sm"
                >
                  Sign In
                </Button>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
