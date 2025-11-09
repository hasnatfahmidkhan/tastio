import { FaRegHeart, FaStar } from "react-icons/fa";

const ReviewCard = ({ review }) => {
  return (
    <div className="card bg-base-100 shadow-sm ">
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
        <div className="absolute top-4 right-4 text-primary cursor-pointer">
          <FaRegHeart size={22} color="currentColor" />
        </div>
      </figure>
      <div className="card-body gap-3">
        <div>
          <h2 className="card-title text-2xl">{review.foodName}</h2>
          <p className="text-lg font-medium text-base-300">
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
