import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Trash2, Search, MapPin, Store } from "lucide-react";
import Swal from "sweetalert2";
import { useState } from "react";
import toast from "react-hot-toast";

const ManageRestaurants = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");

  // 1. Fetch Verified Restaurants
  const {
    data: restaurants = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["all-restaurants", search],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/restaurants?status=verified&search=${search}`
      );
      return res.data;
    },
  });

  // 2. Delete Handler
  const handleDelete = (id, name) => {
    Swal.fire({
      title: "Remove Restaurant?",
      text: `Are you sure you want to remove ${name}? This will delete their profile from the site.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/restaurants/${id}`);
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire("Deleted!", "Restaurant has been removed.", "success");
          }
        } catch (error) {
          toast.error("Failed to delete restaurant");
        }
      }
    });
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <Store className="text-primary" /> Manage Restaurants
          <span className="badge badge-neutral text-lg p-3">
            {restaurants.length}
          </span>
        </h2>

        {/* Search Bar */}
        <div className="relative w-full md:w-auto">
          <input
            type="text"
            placeholder="Search by name or location..."
            className="input input-bordered pl-10 w-full md:w-80"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
        </div>
      </div>

      <div className="overflow-x-auto bg-base-100 shadow-xl rounded-xl border border-base-200">
        <table className="table w-full">
          {/* Head */}
          <thead className="bg-base-200 text-base font-bold">
            <tr>
              <th>#</th>
              <th>Restaurant</th>
              <th>Owner Info</th>
              <th>Cuisine</th>
              <th>Location</th>
              <th>Action</th>
            </tr>
          </thead>
          {/* Body */}
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="6" className="text-center py-10">
                  <span className="loading loading-spinner loading-lg"></span>
                </td>
              </tr>
            ) : restaurants.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-10 text-gray-400">
                  No active restaurants found
                </td>
              </tr>
            ) : (
              restaurants.map((res, index) => (
                <tr key={res._id} className="hover">
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={
                              res.restaurantImage ||
                              "https://i.ibb.co/hR0k7wQ/shop.png"
                            }
                            alt="Logo"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{res.restaurantName}</div>
                        <div className="badge badge-success badge-xs badge-outline">
                          Active
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="font-medium">{res.ownerName}</div>
                    <div className="text-xs opacity-60">{res.ownerEmail}</div>
                  </td>
                  <td>
                    <div className="flex flex-wrap gap-1 max-w-[150px]">
                      {res.cuisine?.slice(0, 3).map((c, i) => (
                        <span key={i} className="badge badge-ghost badge-xs">
                          {c}
                        </span>
                      ))}
                      {res.cuisine?.length > 3 && (
                        <span className="text-xs">
                          +{res.cuisine.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <MapPin size={14} /> {res.location}
                    </div>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(res._id, res.restaurantName)}
                      className="btn btn-ghost btn-sm text-error hover:bg-red-50"
                      title="Delete Restaurant"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageRestaurants;
