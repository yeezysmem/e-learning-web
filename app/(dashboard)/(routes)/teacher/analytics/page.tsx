import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";
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
    <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm min-h-full space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-xs text-gray-500 mt-1">
          Overview of your total sales, revenue, and course performance metrics.
        </p>
      </div>

      {/* Data Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DataCard label="Total Sales" value={totalSales ?? 0} />
        <DataCard
          label="Total Revenue"
          value={totalRevenue}
          // shouldFormat={true}
        />
      </div>

      {/* Revenue/Sales Chart Section */}
      <div className="pt-4 border-t border-gray-100">
        <h2 className="text-base font-bold text-gray-900 mb-4">Revenue Overview</h2>
        <Chart data={data} />
      </div>
    </div>
  );
};

export default AnalyticsPage;
