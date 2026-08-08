import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";

const FoodPageCard = ({ item }) => {
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
    <div className="card bg-base-100 shadow-xl hover:-translate-y-2 transition-transform duration-300 border border-base-200 group">
      <figure className="relative h-60 overflow-hidden">
        <img 
          loading="lazy"
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Top Left: Category Badge */}
        <div className="absolute top-3 left-3 badge badge-neutral font-medium shadow-md">
          {item.category}
        </div>

        {/* Top Right: Favorite Button */}
        <button
          onClick={handleAddFavourite}
          className="absolute top-3 right-3 btn btn-circle btn-sm btn-ghost bg-white/80 backdrop-blur-md hover:bg-white border-none text-gray-600 hover:text-red-500 transition-colors shadow-md h-8 w-8 flex items-center justify-center z-10"
        >
          {favourite ? (
            <FaHeart size={16} className="text-red-500" />
          ) : (
            <FaRegHeart size={16} />
          )}
        </button>

        {/* Bottom Right: Price Badge */}
        <div className="absolute bottom-3 right-3 badge badge-primary font-bold shadow-md">
          ${item.price}
        </div>
      </figure>
      
      <div className="card-body p-6">
        <h2 className="card-title text-xl font-bold justify-between">
          {item.name}
        </h2>
        <p className="text-gray-500 text-sm line-clamp-2 mt-1 mb-4">
          {item.description}
        </p>

        <div className="card-actions justify-between items-center pt-4 border-t border-base-200">
          <span className="text-xs font-semibold text-gray-400 truncate max-w-[120px]">
            {item.restaurantName || "Tastio Seller"}
          </span>
          <Link
            to={`/food-details/${item._id}`}
            className="btn btn-sm btn-outline btn-primary px-6 rounded-full group-hover:btn-active"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FoodPageCard;
