import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import {
  Users,
  Utensils,
  MessageSquare,
  Store,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Spinner from "../../../../Components/Spinner/Spinner";

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => (await axiosSecure.get("/admin-stats")).data,
  });

  if (isLoading)
    return (
      <div className="flex justify-center h-[calc(100vh-150px)] items-center">
        <Spinner />
      </div>
    );

  // Colors for Pie Chart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-base-content">
            Dashboard Overview
          </h2>
          <p className="text-gray-500">Welcome back, Admin!</p>
        </div>
        {stats.pendingSellers > 0 && (
          <Link
            to="/dashboard/manage-applications"
            className="btn btn-warning btn-sm animate-pulse"
          >
            <AlertCircle size={16} /> {stats.pendingSellers} Pending Requests
          </Link>
        )}
      </div>

      {/* 1. Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          count={stats.users}
          icon={<Users />}
          color="bg-blue-100 text-blue-600"
        />
        <StatCard
          title="Total Foods"
          count={stats.menuItems}
          icon={<Utensils />}
          color="bg-green-100 text-green-600"
        />
        <StatCard
          title="Total Reviews"
          count={stats.reviews}
          icon={<MessageSquare />}
          color="bg-purple-100 text-purple-600"
        />
        <StatCard
          title="Active Sellers"
          count={stats.sellers}
          icon={<Store />}
          color="bg-orange-100 text-orange-600"
        />
      </div>

      {/* 2. Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart: Food Categories */}
        <div className="bg-base-100 p-6 rounded-2xl shadow-sm border border-base-200">
          <h3 className="text-xl font-bold mb-6">Food Category Distribution</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#07a061" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart: User Roles (Optional visualization) */}
        <div className="bg-base-100 p-6 rounded-2xl shadow-sm border border-base-200 flex flex-col items-center">
          <h3 className="text-xl font-bold mb-2">Platform Activity</h3>
          <div className="h-80 w-full flex justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="count"
                  label
                >
                  {stats.chartData?.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, count, icon, color }) => (
  <div
    className={`p-6 rounded-2xl shadow-sm border border-base-200 flex items-center gap-4 bg-primary/10`}
  >
    <div className={`p-4 rounded-xl ${color}`}>{icon}</div>
    <div>
      <h3 className="text-base-content text-sm font-bold">{title}</h3>
      <p className="text-3xl font-bold text-accent-content">{count}</p>
    </div>
  </div>
);

export default AdminHome;
