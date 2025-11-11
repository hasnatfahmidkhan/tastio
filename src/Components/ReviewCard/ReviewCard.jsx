import { useEffect, useState } from "react";
import { FaRegHeart, FaStar } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";

const ReviewCard = ({ review }) => {
  const axiosSecure = useAxiosSecure();
  const [favourite, setFavourite] = useState(false);
  const { user } = useAuth();
  const getFavourite = async (email) => {
    const res = await axiosSecure.get(`/favourites?email=${email}`);
    return res.status === 200 ? res.data : [];
  };

  const { data: favourites } = useQuery({
    queryKey: ["favourite"],
    queryFn: () => getFavourite(user?.email),
  });

  useEffect(() => {
    if (favourites?.some((fav) => fav.review === review._id)) {
      setFavourite(true);
    } else {
      setFavourite(false);
    }
  }, [favourites, review._id]);

  const handleAddFavourite = (id) => {
    axiosSecure
      .post("/favourites", {
        review: id,
        photo: review.photo,
        foodName: review.foodName,
        restaurantName: review.restaurantName,
        rating: review.rating,
        email: user?.email,
      })
      .then(({ data }) => {
        if (data.insertedId) {
          setFavourite(true);
          toast.success("Review Added into your favourite list");
        }
      });
  };

  return (
    <div className="card bg-base-100 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] ">
      <figure className="relative h-52 md:h-60">
        <img
          className="h-full w-full object-cover"
          src={review.photo}
          alt="Shoes"
        />
        <div className="badge badge-secondary absolute top-4 left-4 flex items-center font-semibold">
          {review.rating}
          <FaStar />
        </div>
        <div
          onClick={() => handleAddFavourite(review._id)}
          className="absolute top-4 right-4 text-primary cursor-pointer"
        >
          {favourite ? (
            <FaHeart size={22} color="currentColor" />
          ) : (
            <FaRegHeart size={22} color="currentColor" />
          )}
        </div>
      </figure>
      <div className="card-body gap-3">
        <div>
          <h2 className="card-title text-2xl">{review.foodName}</h2>
          <p className="text-lg font-medium text-accent">
            {review.reviewerName}
          </p>
        </div>
        <div className="space-y-1 text-base text-base-content font-medium tracking-wide">
          <p className="">Location: {review.location}</p>
          <p className="">Restaurant Name: {review.restaurantName}</p>
        </div>
        <button className="btn btn-primary mt-2 rounded-full">
          View Details
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;
