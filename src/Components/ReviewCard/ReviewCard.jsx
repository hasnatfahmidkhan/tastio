import { useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { Star, MapPin, Store, User, ArrowRight } from "lucide-react"; // Modern Icons
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";

const ReviewCard = ({ review }) => {
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
    if (favourites?.some((fav) => fav.review === review._id)) {
      setFavourite(true);
    } else {
      setFavourite(false);
    }
  }, [favourites, review._id]);

  const handleAddFavourite = (e) => {
    e.stopPropagation(); // Prevent card click
    if (!user) {
      navigate("/login");
      return;
    }

    axiosSecure
      .post("/favourites", {
        review: review._id,
        photo: review.photo,
        foodName: review.foodName,
        restaurantName: review.restaurantName,
        rating: review.rating,
        email: user?.email,
      })
      .then(({ data }) => {
        if (data.insertedId) {
          setFavourite(true);
          toast.success("Saved to favorites! ❤️");
        }
      });
  };

  // --- UI RENDER ---
  return (
    <div
      className="group card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 border border-base-200 overflow-hidden cursor-pointer h-full flex flex-col"
      onClick={() => navigate(`/review-details/${review._id}`)}
    >
      {/* Image Section */}
      <figure className="relative h-52 overflow-hidden">
        <img
          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
          src={review.photo}
          alt={review.foodName}
          loading="lazy"
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-60"></div>

        {/* Rating Badge */}
        <div className="absolute top-3 left-3 badge badge-warning gap-1 font-bold shadow-sm">
          {review.rating} <Star size={12} className="fill-black text-black" />
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleAddFavourite}
          className="absolute top-3 right-3 btn btn-circle btn-sm btn-ghost bg-white/20 backdrop-blur-md hover:bg-white border-none text-white hover:text-red-500 transition-colors"
        >
          {favourite ? (
            <FaHeart size={16} className="text-red-500" />
          ) : (
            <FaRegHeart size={16} />
          )}
        </button>

        {/* Food Name Overlay */}
        <div className="absolute bottom-3 left-4 right-4">
          <h2 className="text-white font-bold text-xl truncate shadow-sm">
            {review.foodName}
          </h2>
        </div>
      </figure>

      {/* Body Section */}
      <div className="card-body p-5 grow">
        {/* Reviewer Info */}
        <div className="flex items-center gap-3 mb-3 border-b border-base-200 pb-3">
          <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content rounded-full w-8">
              {review.reviewerPhoto ? (
                <img loading="lazy" src={review.reviewerPhoto} alt="user" />
              ) : (
                <span className="text-xs">U</span>
              )}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">
              {review.reviewerName}
            </p>
            <p className="text-xs text-gray-500">Verified Reviewer</p>
          </div>
        </div>

        {/* Restaurant & Location Details */}
        <div className="space-y-2 text-sm text-gray-600 mb-4 grow">
          <div className="flex items-center gap-2">
            <Store size={16} className="text-primary shrink-0" />
            <span className="truncate font-medium">
              {review.restaurantName}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-gray-400 shrink-0" />
            <span className="truncate">
              {review.location || "Dhaka, Bangladesh"}
            </span>
          </div>
        </div>

        {/* Footer Action */}
        <div className="card-actions justify-end mt-auto">
          <button className="btn btn-sm btn-outline btn-primary w-full group-hover:btn-active transition-colors">
            Read Review <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
