import { useQuery } from "@tanstack/react-query";

import {
  User,
  Mail,
  Shield,
  MapPin,
  Calendar,
  Edit,
  Medal,
  ShoppingBag,
  Utensils,
  Star,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Spinner from "../../../Components/Spinner/Spinner";
import { Link } from "react-router";

const Profile = () => {
  const { user: authUser } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: profileData, isLoading } = useQuery({
    queryKey: ["profile", authUser?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/profile/${authUser?.email}`);
      return res.data;
    },
    enabled: !!authUser?.email,
  });

  // reviews
  const { data: myReviews, isLoading: reviewLoading } = useQuery({
    queryKey: ["my-reviews", authUser?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/my-reviews/?email=${authUser?.email}&limit=3`
      );
      return res.data;
    },
    enabled: !!authUser?.email,
  });

  // Fetch Seller's Foods (Limit 3)
  const { data: myFoods = [] } = useQuery({
    queryKey: ["my-recent-foods", authUser?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/menu/seller/${authUser?.email}?limit=3&sort=newest`
      );
      return res.data; // Ensure backend supports limit/sort or slice it here
    },
    enabled: !!authUser?.email && profileData?.user?.role === "seller",
  });

  // Fetch Pending Requests
  const { data: pendingRequests = [] } = useQuery({
    queryKey: ["pending-requests"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/restaurants?status=pending&limit=3`);
      return res.data;
    },
    enabled: profileData?.user?.role === "admin",
  });

  if (isLoading)
    return (
      <div className="flex justify-center h-[calc(100vh-150px)] items-center">
        <Spinner />
      </div>
    );

  const { user, stats } = profileData || {};

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header / Cover Area */}
      <div className="relative mb-20">
        <div className="h-48 bg-linear-to-r from-primary to-secondary-content dark:to-secondary  rounded-t-2xl"></div>

        {/* Profile Picture */}
        <div className="absolute -bottom-20 left-8 flex items-end">
          <div className="avatar">
            <div className="w-32 rounded-full ring ring-base-100 ring-offset-base-100 ring-offset-2">
              <img src={user?.photo || authUser?.photoURL} alt="Profile" />
            </div>
          </div>
          <div className="ml-4 mb-4 hidden md:block">
            <h1 className="text-3xl font-bold text-base-content">
              {user?.name}
            </h1>
            <p className="text-gray-500 font-medium">{user?.email}</p>
          </div>
        </div>

        {/* Edit Button (Optional) */}
        <div className="absolute bottom-4 right-4">
          <button className="btn btn-sm btn-ghost bg-white/20 hover:bg-white/40 text-white backdrop-blur-md border-none">
            <Edit size={16} /> Edit Profile
          </button>
        </div>
      </div>

      {/* Mobile Name View */}
      <div className="md:hidden mt-20 mb-6 px-2">
        <h1 className="text-2xl font-bold">{user?.name}</h1>
        <p className="text-gray-500">{user?.email}</p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {/* Left Column: Personal Info */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-base-100 p-6 rounded-2xl shadow-sm border border-base-200">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <User size={20} className="text-primary" /> About
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-600">
                <Shield size={18} className="text-warning" />
                <span className="badge badge-lg badge-neutral capitalize">
                  {user?.role}
                </span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Mail size={18} />
                <span className="text-sm truncate" title={user?.email}>
                  {user?.email}
                </span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Calendar size={18} />
                <span className="text-sm">
                  Joined:{" "}
                  {new Date(
                    authUser?.metadata?.creationTime
                  ).toLocaleDateString()}
                </span>
              </div>
              {/* Location (If stored) */}
              <div className="flex items-center gap-3 text-gray-600">
                <MapPin size={18} />
                <span className="text-sm">Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Stats & Activity */}
        <div className="md:col-span-2 space-y-6">
          {/* Role Based Stats Cards */}
          <div className="grid grid-cols-2 gap-4">
            {/* USER STATS */}
            {user?.role === "user" && (
              <>
                <StatBox
                  label="Reviews Given"
                  value={stats?.reviewCount}
                  icon={<Medal className="text-yellow-500" size={24} />}
                />
                <StatBox
                  label="Rank"
                  value={stats?.reviewCount > 10 ? "Foodie Master" : "Beginner"}
                  icon={<Shield className="text-blue-500" size={24} />}
                />
              </>
            )}

            {/* SELLER STATS */}
            {user?.role === "seller" && (
              <>
                <StatBox
                  label="Total Foods"
                  value={stats?.foodCount}
                  icon={<Utensils className="text-orange-500" size={24} />}
                />
                <StatBox
                  label="Restaurant"
                  value={stats?.restaurantName}
                  icon={<ShoppingBag className="text-green-500" size={24} />}
                />
              </>
            )}

            {/* ADMIN STATS */}
            {user?.role === "admin" && (
              <div className="col-span-2  p-6 rounded-2xl border border-primary/20 bg-primary/5 text-center">
                <h3 className="text-2xl font-bold text-primary mb-2">
                  Admin Dashboard
                </h3>
                <p className="text-gray-500">
                  You have full access to manage the platform.
                </p>
              </div>
            )}
          </div>

          {/* Activity Section (Placeholder) */}
          <div className="bg-base-100 p-6 rounded-2xl shadow-sm border border-base-200 min-h-[200px]">
            <h3 className="font-bold text-lg mb-4">Recent Activity</h3>
            {/* --- User Recent Activity Section --- */}
            {user?.role === "user" ? (
              <div className="space-y-4">
                {myReviews.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-400">
                      No reviews yet. Go taste something!
                    </p>
                    <Link to="/all-foods" className="btn btn-link btn-sm mt-2">
                      Explore Foods
                    </Link>
                  </div>
                ) : (
                  myReviews.map((review) => (
                    <div
                      key={review._id}
                      className="flex items-start gap-4 p-4 rounded-xl bg-base-100 border border-base-200 hover:border-primary/50 transition-colors group"
                    >
                      {/* Food Image (Optional: If saved in review, else Icon) */}
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-base-200 shrink-0">
                        {review.photo ? (
                          <img
                            src={review.photo}
                            alt="Food"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <Utensils size={20} />
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-base-content truncate pr-2">
                            {review.foodName}
                          </h4>
                          <span className="text-xs text-gray-400 whitespace-nowrap">
                            {new Date(review.postedAt).toLocaleDateString()}
                          </span>
                        </div>

                        {/* Rating Stars */}
                        <div className="flex items-center gap-1 my-1">
                          <Star
                            size={14}
                            className="fill-warning text-warning"
                          />
                          <span className="text-sm font-bold">
                            {review.rating}
                          </span>
                        </div>

                        <p className="text-sm text-gray-500 line-clamp-1">
                          "{review.reviewText}"
                        </p>
                      </div>

                      {/* View Button */}
                      <Link
                        to={`/food-details/${review.menuId}`}
                        className="btn btn-circle btn-sm btn-ghost text-gray-400 group-hover:text-primary group-hover:bg-primary/10"
                      >
                        <ArrowRight size={18} />
                      </Link>
                    </div>
                  ))
                )}

                {/* View All Link */}
                {myReviews?.length > 0 && (
                  <Link
                    to="/dashboard/my-reviews"
                    className="btn btn-block btn-outline btn-sm mt-2"
                  >
                    View All Reviews
                  </Link>
                )}
              </div>
            ) : user?.role === "seller" ? (
              <div className="space-y-4">
                {myFoods.length === 0 ? (
                  <div className="text-center py-6">
                    <p className="text-gray-400">No foods added yet.</p>
                    <Link
                      to="/dashboard/add-food"
                      className="btn btn-sm btn-primary mt-2"
                    >
                      Add Item
                    </Link>
                  </div>
                ) : (
                  myFoods.map((food) => (
                    <div
                      key={food._id}
                      className="flex items-center gap-4 p-3 rounded-xl bg-base-100 border border-base-200 hover:shadow-md transition-all"
                    >
                      {/* Image */}
                      <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-base-300">
                        <img
                          src={food.image}
                          alt={food.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-base-content truncate">
                          {food.name}
                        </h4>
                        <p className="text-xs text-gray-500">{food.category}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="badge badge-sm badge-success badge-outline font-bold">
                            ${food.price}
                          </span>
                          <span className="text-xs text-gray-400">
                            • {new Date(food.addedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      {/* Edit Button */}
                      <Link
                        to={`/dashboard/update-food/${food._id}`}
                        className="btn btn-square btn-sm btn-ghost text-gray-400 hover:text-blue-500"
                      >
                        <Edit size={16} />
                      </Link>
                    </div>
                  ))
                )}
                <Link
                  to="/dashboard/my-foods"
                  className="btn btn-block btn-outline btn-sm mt-2"
                >
                  Manage All Foods
                </Link>
              </div>
            ) : (
              user?.role === "admin" && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Pending Approvals
                  </h4>

                  {pendingRequests.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-6 border-2 border-dashed border-base-300 rounded-xl">
                      <CheckCircle className="text-success mb-2" size={24} />
                      <p className="text-gray-500 font-medium">
                        All caught up!
                      </p>
                      <p className="text-xs text-gray-400">
                        No pending seller requests.
                      </p>
                    </div>
                  ) : (
                    pendingRequests.map((req) => (
                      <div
                        key={req._id}
                        className="flex justify-between items-center p-4 rounded-xl bg-warning/10 border border-warning/20"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-warning text-warning-content flex items-center justify-center font-bold">
                            {req.restaurantName.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-bold text-sm">
                              {req.restaurantName}
                            </h4>
                            <p className="text-xs opacity-70">
                              Owner: {req.ownerName}
                            </p>
                          </div>
                        </div>
                        <Link
                          to="/dashboard/manage-applications"
                          className="btn btn-xs btn-neutral"
                        >
                          Review
                        </Link>
                      </div>
                    ))
                  )}

                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <Link
                      to="/dashboard/manage-users"
                      className="btn btn-outline btn-sm"
                    >
                      Users
                    </Link>
                    <Link
                      to="/dashboard/manage-reviews"
                      className="btn btn-outline btn-sm"
                    >
                      Reviews
                    </Link>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Small Stat Component
const StatBox = ({ label, value, icon }) => (
  <div className="bg-base-100 p-6 rounded-2xl shadow-sm border border-base-200 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
    <div className="mb-2 p-3 bg-base-200 rounded-full">{icon}</div>
    <div className="text-2xl font-bold text-base-content">{value}</div>
    <div className="text-sm text-gray-500">{label}</div>
  </div>
);

export default Profile;
