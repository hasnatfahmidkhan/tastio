import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Trash2, MessageSquare, Search, Star } from "lucide-react";
import Swal from "sweetalert2";
import { useState } from "react";
import { Link } from "react-router";

const ManageReviews = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");

  // 1. Fetch Reviews
  const {
    data: reviews = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["admin-reviews", search],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/reviews?search=${search}`);
      return res.data;
    },
  });

  // 2. Delete Handler
  const handleDeleteReview = (review) => {
    Swal.fire({
      title: "Delete this review?",
      text: `By ${review.reviewerName} on "${review.foodTitle}"`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/admin/reviews/${review._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire("Deleted!", "Review has been removed.", "success");
          }
        });
      }
    });
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <MessageSquare className="text-primary" /> Manage Reviews
          <span className="badge badge-neutral text-lg p-3">
            {reviews.length}
          </span>
        </h2>

        {/* Search Bar */}
        <div className="relative w-full md:w-auto">
          <input
            type="text"
            placeholder="Search by food or email..."
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
              <th>Food Item</th>
              <th>Reviewer</th>
              <th>Rating & Comment</th>
              <th>Date</th>
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
            ) : reviews.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-10 text-gray-400">
                  No reviews found
                </td>
              </tr>
            ) : (
              reviews.map((review, index) => (
                <tr key={review._id} className="hover">
                  <th>{index + 1}</th>
                  <td>
                    <Link
                      to={`/review-details/${review._id}`}
                      className="font-bold text-primary hover:underline"
                    >
                      {review.foodName}
                    </Link>
                    {/* You can add food ID for debugging if needed */}
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="w-10 rounded-full">
                          <img
                            src={review.reviewerPhoto || "./profile.png"}
                            alt="User"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{review.reviewerName}</div>
                        <div className="text-xs opacity-50">
                          {review.reviewerEmail}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="max-w-xs">
                    <div className="flex items-center gap-1 text-warning font-bold mb-1">
                      {review.rating} <Star size={14} fill="orange" />
                    </div>
                    <p
                      className="text-sm text-gray-600 truncate"
                      title={review.comment}
                    >
                      {review.reviewText}
                    </p>
                  </td>
                  <td className="text-sm text-gray-500">
                    {new Date(review.postedAt).toLocaleDateString()}
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteReview(review)}
                      className="btn btn-ghost btn-sm text-error hover:bg-red-50 tooltip tooltip-left"
                      data-tip="Delete Review"
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

export default ManageReviews;
