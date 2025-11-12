import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { FaArrowLeft, FaStar } from "react-icons/fa";

const ReviewDetails = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();

  const getDeatils = async () => {
    const res = await axiosSecure.get(`/reviews/${id}`);
    return res.status === 200 && res.data;
  };

  const { data, isPending } = useQuery({
    queryKey: ["reviews", id],
    queryFn: getDeatils,
  });
  if (isPending) {
    return <p>Loading...</p>;
  }

  const {
    _id,
    foodName,
    photo,
    restaurantName,
    location,
    reviewerName,
    reviewerEmail,
    rating,
    postedAt,
    reviewText,
  } = data;

  return (
    <section>
      <div className="flex flex-col md:flex-row items-center gap-y-4 md:gap-6 xl:gap-8">
        <div className="w-full md:w-1/2">
          <img
            className="rounded-xl h-60 md:h-96 xl:h-[400px] object-cover w-full"
            src={photo}
            alt=""
          />
        </div>
        <div className="w-full md:w-1/2">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 py-2 cursor-pointer hover:text-gray-400 transition-colors duration-200 font-semibold"
          >
            <FaArrowLeft /> Go Back
          </button>
          <h2 className="text-3xl md:text-4xl xl:text-5xl font-semibold">
            {foodName}
          </h2>
          <div className="bg-secondary p-4 rounded-xl space-y-1 tracking-wide font-medium my-2">
            <p>Restuarant Name: {restaurantName}</p>
            <p>Location: {location}</p>
          </div>
          <div className="bg-secondary p-4 rounded-xl space-y-1 tracking-wide font-medium my-5">
            <p>Reviewer Name: {reviewerName}</p>
            <p>Reviewer Email: {reviewerEmail}</p>
          </div>
          <div className="bg-secondary p-4 rounded-xl space-y-1 tracking-wide font-medium md:my-5">
            <p className="flex items-center gap-1">
              Rating:{" "}
              <span className="flex items-center gap-0.5">
                {rating} <FaStar color="#facc15" />
              </span>
            </p>
            <p>Posted At: {new Date(postedAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
      <div className="bg-secondary p-4 rounded-xl space-y-1 tracking-wide font-medium my-5 leading-relaxed">
        <span className="font-semibold">Reviewer Say's: </span>
        {reviewText}
      </div>
    </section>
  );
};

export default ReviewDetails;
