import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { CheckCircle, XCircle } from "lucide-react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const ManageApplications = () => {
  const axiosSecure = useAxiosSecure();

  const { data: applications = [], refetch } = useQuery({
    queryKey: ["seller-requests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/restaurants?status=pending");
      return res.data;
    },
  });

  const handleApprove = async (app) => {
    try {
      const res = await axiosSecure.patch(`/restaurants/verify/${app._id}`, {
        email: app.ownerEmail,
      });

      if (res.data.userResult.modifiedCount > 0) {
        toast.success(`${app.restaurantName} is now Verified! ✅`);
        refetch();
      }
    } catch (error) {
      toast.error("Failed to approve");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">
        Seller Applications ({applications.length})
      </h2>

      <div className="overflow-x-auto bg-base-100 shadow-xl rounded-xl">
        <table className="table">
          {/* Head */}
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Restaurant</th>
              <th>Owner Info</th>
              <th>Cuisine</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          {/* Body */}
          <tbody>
            {applications.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No pending requests
                </td>
              </tr>
            ) : (
              applications.map((app, index) => (
                <tr key={app._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="font-bold">{app.restaurantName}</div>
                    <div className="text-xs opacity-50">{app.location}</div>
                  </td>
                  <td>
                    <div>{app.ownerName}</div>
                    <div className="text-xs text-blue-500">
                      {app.ownerEmail}
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-wrap gap-1">
                      {app.cuisine.map((c, i) => (
                        <span key={i} className="badge badge-ghost badge-xs">
                          {c}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <div className="badge badge-warning gap-2">Pending</div>
                  </td>
                  <td>
                    <button
                      onClick={() => handleApprove(app)}
                      className="btn btn-sm btn-success text-white"
                      title="Approve"
                    >
                      <CheckCircle size={16} /> Approve
                    </button>
                    {/* Reject button (Optional) */}
                    <button className="btn btn-sm btn-error text-white ml-2">
                      <XCircle size={16} />
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

export default ManageApplications;
