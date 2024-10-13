"use client";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Learnify from "../../../public/Learnify.svg";
import logo from "@/public/logo.svg";
import { getServerSession } from "next-auth";
import { useSession, signIn, signOut } from "next-auth/react";
// import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { callbackify } from "util";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { IconBadge } from "@/components/icon-badge";
import SendButton from "../(routes)/role/components/sendButton";
// import { authOptions } from "../../api/auth/";

const Header = () => {
  // const session = await getServerSession(authOptions);
  const { data: session } = useSession();
  const user = session?.user;
  const role = user?.role;
  const router = useRouter();
  const Register = () => {
    router.push("/api/auth/signin");
  };

  return (
    <header>
      <div className="container flex justify-center items-center ">
        <div className="mr-auto flex items-center">
          <Image src={logo} width={80} height={80} alt="logo" />
        </div>
        <nav>
          <ul className="flex justify-center items-center gap-8 p-4">
            {/* {role === "user" ? ( */}
              <li className=" hover:text-green-400 transition-all cursor-pointer">
                <Link href="/"> Dashboard </Link>
              </li>
            {/* ) : null} */}
              <li className=" hover:text-green-400 transition-all cursor-pointer">
                <Link href="/search"> Search </Link>
              </li>
              <li className=" hover:text-green-400 transition-all cursor-pointer">
                <SendButton userId={user?.id} newRole={"teacher"} />
              </li>
            {/* {role === "user" ? ( */} 
              {/* <li className=" hover:text-green-400 transition-all cursor-pointer">
                <SendButton userId={user?.id} newRole={"teacher"} />
              </li> */}
            {/* ) : null}
            {/* {role === "teacher" ? ( */}
              <li className=" hover:text-green-400 transition-all cursor-pointer">
                <Link href="/teacher/courses"> Create course </Link>
              </li>
            {/* // ) : null} */}
            {role === "teacher" ? (
              <li className=" hover:text-green-400 transition-all cursor-pointer">
                <Link href="/teacher/analytics"> Analytics </Link>
              </li>
            ) : null}
            {role === "teacher" ? (
              <li className=" hover:text-green-400 transition-all cursor-pointer">
                <SendButton userId={user?.id} newRole={"user"} />
              </li>
            ) : null}
            <li>
              {session ? (
                <div className="flex justify-between cursor-pointer items-center gap-2">
                  <div>
                    <Image
                      src={session?.user?.image}
                      alt="Picture of the author"
                      width={30}
                      height={30}
                      className="rounded-sm"
                    />
                  </div>
                  <div>
                    <LogOut
                      onClick={() => signOut()}
                      width={17}
                      height={17}
                      className="text-white"
                    />
                  </div>
                  {/* <button className="pl-5" onClick={() => signOut()}>
                    <span className="text-white text-sm">Sign out</span>
                  </button> */}
                </div>
              ) : (
                <button
                  onClick={() => signIn()}
                  className="text-sidebarLink text-sm"
                >
                  Sign in
                </button>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
// if login show another logo and hide the login button

export default Header;
