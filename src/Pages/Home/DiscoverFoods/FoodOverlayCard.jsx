import { Star } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";

const FoodOverlayCard = ({ item }) => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [favourite, setFavourite] = useState(false);
  const { user } = useAuth();

  // --- Logic: Check Favorites ---
  const getFavourite = async (email) => {
    if (!email) return [];
    const res = await axiosSecure.get(`/favourites?email=${email}`);
    return res.status === 200 ? res.data : [];
  };

  const { data: favourites } = useQuery({
    queryKey: ["favourite", user?.email],
    queryFn: () => getFavourite(user?.email),
    enabled: !!user?.email, // Only fetch if user exists
  });

  useEffect(() => {
    if (favourites?.some((fav) => fav.review === item._id)) {
      setFavourite(true);
    } else {
      setFavourite(false);
    }
  }, [favourites, item._id]);

  const handleAddFavourite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      navigate("/login");
      return;
    }

    axiosSecure
      .post("/favourites", {
        review: item._id, // Using 'review' field to match backend schema
        photo: item.image,
        foodName: item.name,
        restaurantName: item.restaurantName || "Tastio Seller",
        rating: item.averageRating || 0,
        email: user?.email,
      })
      .then(({ data }) => {
        if (data.insertedId) {
          setFavourite(true);
          toast.success("Saved to favorites! ❤️");
        }
      });
  };

  return (
    <Link
      to={`/food-details/${item._id}`}
      className="group block relative rounded-2xl overflow-hidden h-80 shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      {/* Background Image */}
      <img
        loading="lazy"
        src={item.image}
        alt={item.name}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/70 transition-colors duration-300" />

      {/* Top Badges */}
      <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
        {/* Category */}
        <span className="bg-primary/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
          {item.category}
        </span>

        {/* Rating and Favorite */}
        <div className="flex justify-center items-center gap-2">
          {/* Rating */}
          <div className="bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-md h-fit text-black">
            <Star size={12} className="text-warning fill-warning" />
            {item.averageRating > 0 ? item.averageRating.toFixed(1) : "New"}
          </div>

          {/* Favorite Button */}
          <button
            onClick={handleAddFavourite}
            className="btn btn-circle btn-sm btn-ghost bg-white/80 backdrop-blur-md hover:bg-white border-none text-gray-600 hover:text-red-500 transition-colors shadow-md h-7 w-7 flex items-center justify-center"
          >
            {favourite ? (
              <FaHeart size={14} className="text-red-500" />
            ) : (
              <FaRegHeart size={14} />
            )}
          </button>
        </div>
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="text-white font-bold text-xl leading-tight mb-1 drop-shadow-lg group-hover:translate-x-1 transition-transform duration-300">
          {item.name}
        </h3>

        {item.description && (
          <p className="text-white/70 text-sm line-clamp-2 mb-3">
            {item.description}
          </p>
        )}

        <div className="flex items-center justify-between">
          <span className="text-2xl font-extrabold text-white drop-shadow-lg">
            ${item.price}
          </span>
          <span className="text-white/60 text-xs font-medium">
            By {item.restaurantName || "Tastio Seller"}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default FoodOverlayCard;
