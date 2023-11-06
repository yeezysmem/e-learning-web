"use client";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";


const ACTIVE_ROUTE = "text-blue-600";
const INACTIVE_ROUTE = "text-gray-600";

function AuthButton() {
    const { data: session } = useSession();

    if (session) {
        return (
            <>
                {session?.user?.name} <br />
                <button onClick={() => signOut()}>Sign out</button>
            </>
        );
    }
    return (
        <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
        </>
    )
}

export default function NavMenu() {
    const pathname = usePathname();
    return (
        <div>
            <AuthButton />
            <ul>
                <Link href="/">
                    <li className={pathname === "/" ? ACTIVE_ROUTE : INACTIVE_ROUTE}>Home</li>
                </Link>
                <Link href="/protected">
                    <li className={pathname === "/protected" ? ACTIVE_ROUTE : INACTIVE_ROUTE}>Protected</li>
                </Link>
            </ul>
        </div>
    );
}