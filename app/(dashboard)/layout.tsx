import Header from "./_components/header";
import { Sidebar } from "./_components/sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full ">
      <Header />

      <main className="h-full">{children}</main>
    </div>
  );
}
