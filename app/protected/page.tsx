import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
export default async function ProtectedRoute() {
    const session = await getServerSession();
    if(!session || !session.user) {
        redirect("/api/auth/signin");
    }
    return (
        <div>
            This is a protected route
        </div>
    )
}