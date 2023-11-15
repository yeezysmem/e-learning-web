import { Sidebar } from "./_components/sidebar";

export default async function DashboardLayout ({
  children
}: {
  children: React.ReactNode;
})  {
  return ( 
    <div className="h-full ">
      <div className="hidden md:flex h-full w-60 flex-col fixed inset-y-0 z-50  ">
        <Sidebar />
      </div>
      <main className="md:pl-60  h-full">
        {children}
      </main>
    </div>
   );
}
 