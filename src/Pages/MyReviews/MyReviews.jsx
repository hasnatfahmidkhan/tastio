import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MyReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const quiryClient = useQueryClient();
  //? get my review
  const getMyReviews = async (email) => {
    const res = await axiosSecure.get(`/my-reviews?email=${email}`);
    return res.status === 200 ? res.data : [];
  };
  const { data, isPending } = useQuery({
    queryKey: ["reviews", user?.email],
    queryFn: () => getMyReviews(user?.email),
  });

  console.log(isPending);

  //! delete review
  const deleteMutation = useMutation({
    mutationFn: (id) => handleMyReviewDelete(id),
    // in here delete review from the cache data 
    onSuccess: (data, id) => {
      quiryClient.setQueryData(["reviews", user?.email], (curElem) => {
        return curElem?.filter((review) => review._id !== id);
      });
    },
  });

  const handleMyReviewDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#22c55e",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        //! delete a review
        await axiosSecure.delete(`/my-reviews/${id}`);
        Swal.fire({
          title: "Deleted!",
          text: "Your review has been deleted.",
          icon: "success",
        });
        return id;
      }
    });
  };
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr className="text-lg">
            <th>Food Image</th>
            <th>Food Name</th>
            <th>Restaurant Name</th>
            <th>Posted At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {data?.map((review) => {
            const { _id, photo, foodName, restaurantName, postedAt } = review;
            return (
              <tr key={_id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={photo} alt={foodName} />
                      </div>
                    </div>
                  </div>
                </td>
                <td className="table-td">{foodName}</td>
                <td className="table-td">{restaurantName}</td>
                <td className="table-td">
                  {new Date(postedAt).toLocaleString()}
                </td>
                <td className="flex items-center gap-2">
                  <button className="btn btn-info text-base-200 btn-sm text-sm tracking-wide">
                    Edit
                  </button>
                  <button
                    onClick={() => deleteMutation.mutate(_id)}
                    className="btn btn-error text-base-200 btn-sm text-sm tracking-wide"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MyReviews;
