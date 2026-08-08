import { useQuery } from "@tanstack/react-query";
import { useParams, Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import Container from "../../Components/Container/Container";
import Spinner from "../../Components/Spinner/Spinner";
import ReviewSection from "./ReviewSection";
import useAxios from "../../hooks/useAxios";

const FoodDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxios();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [favourite, setFavourite] = useState(false);

  const getFavourite = async (email) => {
    if (!email) return [];
    const res = await axiosSecure.get(`/favourites?email=${email}`);
    return res.status === 200 ? res.data : [];
  };

  const { data: favourites } = useQuery({
    queryKey: ["favourite", user?.email],
    queryFn: () => getFavourite(user?.email),
    enabled: !!user?.email,
  });

  const {
    data: food,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["food", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/menu/${id}`);
      return res.data;
    },
    enabled: !!id, // Only run query if ID exists
  });

  useEffect(() => {
    if (favourites?.some((fav) => fav.review === id)) {
      setFavourite(true);
    } else {
      setFavourite(false);
    }
  }, [favourites, id]);

  const handleAddFavourite = (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }

    if (!food) return;

    axiosSecure
      .post("/favourites", {
        review: food._id,
        photo: food.image,
        foodName: food.name,
        restaurantName: food.restaurant?.restaurantName || "Tastio Seller",
        rating: food.averageRating || 0,
        email: user?.email,
      })
      .then(({ data }) => {
        if (data.insertedId) {
          setFavourite(true);
          toast.success("Saved to favorites! ❤️");
        }
      });
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Spinner />
      </div>
    );

  // ✅ Add Error/Empty State Handling
  if (isError || !food) {
    return (
      <div className="text-center py-20 text-error">
        Failed to load food details.
      </div>
    );
  }

  return (
    <Container className={"mt-10"}>
      {/* Food Info Card */}
      <div className="card lg:card-side bg-base-100 shadow-xl mb-10 border border-base-200 mt-10">
        <figure className="lg:w-1/2 h-96 relative">
          <img
            loading="lazy"
            src={food.image} // Safe now because we checked !food above
            alt={food.name}
            className="w-full h-full object-cover"
          />
        </figure>
        <div className="card-body lg:w-1/2 relative">
          <div className="flex justify-between items-start">
            <h2 className="card-title text-4xl mb-2 pr-12">{food.name}</h2>
            
            <button
              onClick={handleAddFavourite}
              className="absolute top-8 right-8 btn btn-circle btn-ghost bg-base-200/50 hover:bg-base-300 border-none text-gray-500 hover:text-red-500 transition-colors shadow-sm"
            >
              {favourite ? (
                <FaHeart size={24} className="text-red-500" />
              ) : (
                <FaRegHeart size={24} />
              )}
            </button>
          </div>
          
          <p className="text-xl font-bold text-primary">${food.price}</p>
          <p className="py-4 text-gray-500">{food.description}</p>

          <div className="flex items-center gap-4 mt-auto">
            <div className="badge badge-outline p-4">
              By: {food.restaurant?.restaurantName || "Unknown"}{" "}
            </div>
            <div className="badge badge-secondary p-4">{food.category}</div>
          </div>
        </div>
      </div>

      {/* Review Section */}
      <ReviewSection
        restaurantId={food.restaurant?._id}
        restaurantName={food.restaurant?.restaurantName}
        location={food.restaurant?.location}
        photo={food.image}
        foodId={id}
        foodTitle={food.name}
      />
    </Container>
  );
};
export default FoodDetails;
