import Header from "./_components/header";
import { Sidebar } from "./_components/sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full">
      <div className="fixed">
      <Sidebar />
      </div>
      <main className="md:pl-44 h-full flex-grow overflow-auto bg-white mt-1.5">
        {children}
      </main>
    </div>
  );
}
