import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { getAnalytics } from "@/actions/get-analytics";
import { DataCard } from "./_components/data-card";
import { Chart } from "./_components/chart";

const AnalyticsPage = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) {
    return redirect("/");
  }
  const { data, totalRevenue, totalSales } = await getAnalytics(userId);
  return (
    <div className="container h-[100vh] bg-gray-100 border m-1.5 rounded-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 mb-1.5 mt-8">
        <DataCard label="Total Sales" value={totalSales} />
        <DataCard label="Total Revenue" value={totalRevenue} shouldFortmat={true} />
      </div>
      <Chart data={data}></Chart>
    </div>
  );
};

export default AnalyticsPage;
