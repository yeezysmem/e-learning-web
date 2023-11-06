import { getServerSession } from "next-auth";

export default async function ServerActionPage() {
    const session = await getServerSession();
    const whoAmI = async () => {
        "use server";
        const session = await getServerSession();
        return session?.user?.name || "Not signed in";
    };
}