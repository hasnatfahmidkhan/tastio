import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import Spinner from "../../Components/Spinner/Spinner";

const MyReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: reviews = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-reviews", user?.email],
    queryFn: async () =>
      (await axiosSecure.get(`/my-reviews?email=${user.email}`)).data,
  });

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/my-reviews/${id}`);
        if (res.data.deletedCount > 0) refetch();
      }
    });
  };

  if (isLoading)
    return (
      <div className="flex justify-center h-[calc(100vh-150px)] items-center">
        <Spinner />
      </div>
    );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Reviews ({reviews.length})</h2>
      <div className="overflow-x-auto">
        <table className="table w-full bg-base-100 shadow-md rounded-lg">
          <thead>
            <tr>
              <th>Food</th>
              <th>Rating</th>
              <th>Comment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review._id}>
                <td className="font-bold">{review.foodName}</td>
                <td className="text-warning font-bold">{review.rating} ⭐</td>
                <td className="max-w-xs truncate">{review.reviewText}</td>
                <td>
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="btn btn-sm btn-error text-white"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default MyReviews;
