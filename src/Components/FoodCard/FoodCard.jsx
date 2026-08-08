import { Star } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";

const FoodCard = ({ item }) => {
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
    <Link to={`/food-details/${item._id}`} className="group block">
      <div className="w-72 bg-base-100 rounded-2xl shadow-sm border border-base-200 overflow-hidden hover:shadow-xl hover:border-primary/50 transition-all duration-300">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            loading="lazy"
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />

          <div className="absolute top-3 left-3 bg-base-100/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm">
            <Star size={12} className="text-warning fill-warning" />
            {item.averageRating > 0 ? item.averageRating.toFixed(2) : "New"}
          </div>

          <button
            onClick={handleAddFavourite}
            className="absolute top-3 right-3 btn btn-circle btn-sm btn-ghost bg-white/80 backdrop-blur-md hover:bg-white border-none text-gray-600 hover:text-red-500 transition-colors shadow-md h-8 w-8 flex items-center justify-center"
          >
            {favourite ? (
              <FaHeart size={16} className="text-red-500" />
            ) : (
              <FaRegHeart size={16} />
            )}
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-bold text-lg truncate group-hover:text-primary transition-colors">
            {item.name}
          </h3>
          <p className="text-xs text-gray-500 mb-3">
            By {item.restaurantName || "Tastio Seller"}
          </p>

          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-primary">
              ${item.price}
            </span>
            <span className="text-xs font-medium bg-base-200 px-2 py-1 rounded-full">
              {item.category}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FoodCard;
