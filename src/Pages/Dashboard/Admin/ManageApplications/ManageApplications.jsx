import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { CheckCircle, XCircle } from "lucide-react";
import Swal from "sweetalert2"; // Import SweetAlert
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const ManageApplications = () => {
  const axiosSecure = useAxiosSecure();

  const { data: applications = [], refetch } = useQuery({
    queryKey: ["seller-requests"],
    queryFn: async () => {
      // Ensure your backend returns requests that are pending
      const res = await axiosSecure.get("/restaurants?status=pending");
      return res.data;
    },
  });

  // Approve Handler
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

  // Reject Handler (NEW)
  const handleReject = (app) => {
    Swal.fire({
      title: "Reject Application?",
      text: `Are you sure you want to reject ${app.restaurantName}?`,
      icon: "warning",
      input: "text", // Input box for reason
      inputPlaceholder: "Enter reason for rejection...",
      showCancelButton: true,
      confirmButtonColor: "#ef4444", // Red color
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Reject",
      preConfirm: (reason) => {
        if (!reason) {
          Swal.showValidationMessage("Please enter a reason");
        }
        return reason;
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(
            `/restaurants/reject/${app._id}`,
            {
              reason: result.value, // Send the input value
            }
          );

          if (res.data.modifiedCount > 0) {
            Swal.fire("Rejected!", "Application has been rejected.", "success");
            refetch();
          }
        } catch (error) {
          toast.error("Failed to reject application");
        }
      }
    });
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
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApprove(app)}
                        className="btn btn-sm btn-success text-white"
                        title="Approve"
                      >
                        <CheckCircle size={16} /> Approve
                      </button>

                      {/* Reject Button with Handler */}
                      <button
                        onClick={() => handleReject(app)}
                        className="btn btn-sm btn-error text-white"
                        title="Reject"
                      >
                        <XCircle size={16} /> Reject
                      </button>
                    </div>
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
