import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import noData from "../../assets/No-Data.json";
import Lottie from "lottie-react";

const MyFavourite = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const getFavourite = async (email) => {
    const res = await axiosSecure.get(`/favourites?email=${email}`);
    return res.status === 200 ? res.data : [];
  };

  const { data: favourites } = useQuery({
    queryKey: ["favourite", user?.email],
    queryFn: () => getFavourite(user?.email),
  });

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#22c55e",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) {
      throw new Error("User cancel the deletation");
    }
    //! delete a review
    await axiosSecure.delete(`/favourites/${id}`);
    await Swal.fire({
      title: "Deleted!",
      text: "Your review has been deleted.",
      icon: "success",
    });
    return id;
  };

  //! delete review
  const deleteMutation = useMutation({
    mutationFn: (id) => handleDelete(id),
    // in here delete review from the cache data
    onSuccess: (id) => {
      queryClient.setQueryData(["favourite", user?.email], (curElem) => {
        return curElem?.filter((review) => review._id !== id);
      });
    },
  });

  return (
    <section>
      <h2 className="text-4xl md:text-5xl font-bold text-primary text-center mb-3 md:mb-5">
        Favourite <span className="text-base-content">Reviews</span>
      </h2>
      {!favourites?.length ? (
        <div className="flex justify-center mt-15">
          <Lottie animationData={noData} loop={true} className="w-sm" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr className="text-lg">
                <th>Food Image</th>
                <th>Food Name</th>
                <th>Restaurant Name</th>
                <th>Rating</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {favourites?.map((review) => {
                const { _id, photo, foodName, restaurantName, rating } = review;
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
                    <td className="table-td">{rating}</td>
                    <td className="flex items-center gap-2">
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
      )}
    </section>
  );
};

export default MyFavourite;
