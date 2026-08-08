import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Lottie from "lottie-react";
import { ArrowRight, Heart, Trash2 } from "lucide-react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import noData from "../../assets/No-Data.json";
import Container from "../../Components/Container/Container";
import SectionHeader from "../../Components/SectionHeader/SectionHeader";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Wishlist = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const getFavourite = async (email) => {
    const res = await axiosSecure.get(`/favourites?email=${email}`);
    return res.status === 200 ? res.data : [];
  };

  const { data: favourites, isLoading } = useQuery({
    queryKey: ["favourite", user?.email],
    queryFn: () => getFavourite(user?.email),
  });

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Remove from Wishlist?",
      text: "You can always add it back later.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
    });

    if (result.isConfirmed) {
      await axiosSecure.delete(`/favourites/${id}`);
      Swal.fire("Removed!", "Item removed from your wishlist.", "success");
      return id;
    }
  };

  const deleteMutation = useMutation({
    mutationFn: (id) => handleDelete(id),
    onSuccess: (id) => {
      if (id) {
        queryClient.setQueryData(["favourite", user?.email], (curElem) => {
          return curElem?.filter((review) => review._id !== id);
        });
      }
    },
  });

  return (
    <Container className={""}>
      <title>My Cravings | Tastio</title>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4 pb-6">
        <SectionHeader
          heading="Food Bucket List"
          subHeading="The delicious foods you plan to eat soon!"
          badge="My Cravings"
          icon={Heart}
          align="left"
        ></SectionHeader>
        <div className="text-right">
          <p className="text-lg font-bold">{favourites?.length || 0} Items</p>
          <p className="text-xs text-gray-400">Saved</p>
        </div>
      </div>

      {!favourites?.length && !isLoading ? (
        <div className="flex flex-col justify-center items-center py-20 bg-base-200/50 rounded-3xl border border-dashed border-base-300">
          <Lottie animationData={noData} loop={true} className="w-64" />
          <h3 className="text-xl font-bold mt-4 text-gray-500">
            Your wishlist is empty!
          </h3>
          <Link to="/all-foods" className="btn btn-primary mt-4">
            Explore Foods
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto bg-base-100 shadow-xl rounded-2xl border border-base-200">
          <table className="table w-full">
            {/* head */}
            <thead className="bg-base-200/50">
              <tr>
                <th className="pl-6">Food Details</th>
                <th>Restaurant</th>
                <th>Rating</th>
                <th className="pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-base-200">
              {favourites?.map((review) => {
                const { _id, photo, foodName, restaurantName, rating } = review;

                return (
                  <tr key={_id} className="group hover:bg-base-200/30">
                    <td className="pl-6">
                      <div className="flex items-center gap-4">
                        <div className="avatar">
                          <div className="mask mask-squircle h-16 w-16">
                            <img
                              loading="lazy"
                              src={photo}
                              alt={foodName}
                              className="object-cover"
                            />
                          </div>
                        </div>
                        <div className="font-bold text-lg">{foodName}</div>
                      </div>
                    </td>
                    <td className="text-gray-600 font-medium">
                      {restaurantName}
                    </td>
                    <td>
                      <div className="badge badge-warning font-bold gap-1">
                        {rating} ★
                      </div>
                    </td>
                    <td className="pr-6 text-right">
                      <div className="flex justify-end items-center gap-2">
                        <Link
                          to={`/review-details/${review.review}`}
                          className="btn btn-sm btn-ghost text-primary"
                        >
                          View <ArrowRight size={16} />
                        </Link>
                        <button
                          onClick={() => deleteMutation.mutate(_id)}
                          className="btn btn-sm btn-square btn-ghost text-error hover:bg-error/10"
                          title="Remove"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </Container>
  );
};

export default Wishlist;
