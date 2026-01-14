import { useQuery } from "@tanstack/react-query";
import { Utensils, Star, MessageSquare } from "lucide-react";
import { Link } from "react-router";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Spinner from "../../../../Components/Spinner/Spinner";

const SellerHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // 1. Fetch Stats
  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["seller-stats", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/seller-stats/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center h-[calc(100vh-150px)] items-center">
        <Spinner />
      </div>
    );

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-base-content">
          Dashboard Overview
        </h1>
        <p className="text-gray-500 mt-1">
          Welcome back to{" "}
          <span className="font-bold text-primary">
            {stats.restaurantName || "Your Shop"}
          </span>
          ! Here is what's happening.
        </p>
      </div>

      {/* 1. Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Foods Card */}
        <div className="stat bg-base-100 shadow-sm border border-base-200 rounded-2xl">
          <div className="stat-figure text-primary bg-primary/10 p-3 rounded-full">
            <Utensils size={32} />
          </div>
          <div className="stat-title font-semibold">Total Menu Items</div>
          <div className="stat-value text-primary">{stats.foodCount}</div>
          <div className="stat-desc">Items listed in your shop</div>
        </div>

        {/* Total Reviews Card */}
        <div className="stat bg-base-100 shadow-sm border border-base-200 rounded-2xl">
          <div className="stat-figure text-secondary bg-secondary/10 p-3 rounded-full">
            <MessageSquare size={32} className="text-secondary" />
          </div>
          <div className="stat-title font-semibold">Total Reviews</div>
          <div className="stat-value text-secondary">{stats.totalReviews}</div>
          <div className="stat-desc">Customer feedback received</div>
        </div>

        {/* Average Rating Card */}
        <div className="stat bg-base-100 shadow-sm border border-base-200 rounded-2xl">
          <div className="stat-figure text-warning bg-warning/10 p-3 rounded-full">
            <Star size={32} className="text-warning fill-warning" />
          </div>
          <div className="stat-title font-semibold">Average Rating</div>
          <div className="stat-value text-warning">{stats.avgRating || 0}</div>
          <div className="stat-desc">Based on all reviews</div>
        </div>
      </div>

      {/* 2. Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Add Food CTA */}
        <div className="bg-gradient-to-r from-primary to-green-600 rounded-2xl p-8 text-white flex flex-col justify-between shadow-lg relative overflow-hidden group">
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-2">Add New Item</h3>
            <p className="opacity-90 mb-6">
              Expand your menu and attract more customers.
            </p>
            <Link
              to="/dashboard/add-food"
              className="btn btn-white text-primary border-none hover:bg-gray-100"
            >
              Add Food Now
            </Link>
          </div>
          <Utensils className="absolute -bottom-4 -right-4 w-32 h-32 opacity-20 rotate-12 group-hover:scale-110 transition-transform" />
        </div>

        {/* Manage Foods CTA */}
        <div className="bg-base-100 border border-base-200 rounded-2xl p-8 flex flex-col justify-center items-start shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-xl font-bold mb-2 text-base-content">
            Manage Your Menu
          </h3>
          <p className="text-gray-500 mb-6">
            Update prices, edit descriptions, or remove unavailable items.
          </p>
          <Link
            to="/dashboard/my-foods"
            className="btn btn-outline btn-primary"
          >
            View My Foods
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SellerHome;
